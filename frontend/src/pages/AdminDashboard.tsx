import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { Modal } from "../components/UserModal";

type SubUser = {
  id?: number; // Optional for "add" mode
  username: string;
  email: string;
  password?: string; // Optional for "edit" mode
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [subUsers, setSubUsers] = useState<SubUser[]>([]);
  const { user, setUser, setIsAuthenticated }: any = useContext(AuthContext);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    mode: "add" as "add" | "edit",
    user: null as SubUser | null,
  });

  const token = localStorage.getItem("token");
  const tokenValue = token ? JSON.parse(token).token : null;

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users", {
        headers: { Authorization: `Bearer ${tokenValue}` },
      });
      setSubUsers(response.data.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const logout = async () => {
    try {
      await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true });
      localStorage.clear();
      setUser(null);
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const openModal = (mode: "add" | "edit", user: SubUser | null = null) => {
    setModalConfig({ isOpen: true, mode, user });
  };

  const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });

  const handleModalSubmit = async (formData: SubUser) => {
    try {
      if (modalConfig.mode === "add") {
        await axios.post("http://localhost:3000/api/register", formData, {
          headers: { Authorization: `Bearer ${tokenValue}` },
        });
      } else if (formData.id) {
        await axios.patch(`http://localhost:3000/api/user/${formData.id}/update`, formData, {
          headers: { Authorization: `Bearer ${tokenValue}` },
        });
      }
      fetchUsers();
      closeModal();
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/user/${userId}/delete`, {
        headers: { Authorization: `Bearer ${tokenValue}` },
      });
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="p-5">
      <div className="flex space-x-4">
        <button
          className="p-3 text-white bg-green-600 rounded hover:bg-green-700"
          onClick={() => openModal("add")}
        >
          ADD USER
        </button>
        <button
          className="p-3 text-white bg-blue-600 rounded hover:bg-blue-700"
          onClick={logout}
        >
          LOG OUT
        </button>
      </div>
      <h1 className="text-2xl font-bold mt-5">Admin {user?.username}</h1>

      <div className="mt-5">
        <div className="bg-gray-200 p-3 rounded-t flex justify-between font-bold">
          <div className="w-1/3">Email</div>
          <div className="w-1/3">Username</div>
          <div className="w-1/3 text-center">Action</div>
        </div>

        {subUsers.length > 0 ? (
          <ul className="divide-y divide-gray-300">
            {subUsers.map((user) => (
              <li
                key={user.id}
                className="p-3 flex justify-between items-center hover:bg-gray-100"
              >
                <div className="w-1/3 text-gray-800">{user.email}</div>
                <div className="w-1/3 text-gray-800">{user.username}</div>
                <div className="w-1/3 text-center flex justify-center space-x-4">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => openModal("edit", user)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteUser(user?.id!)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>

      {modalConfig.isOpen && (
        <Modal
          isOpen={modalConfig.isOpen}
          title={modalConfig.mode === "add" ? "Add New User" : "Edit User"}
          mode={modalConfig.mode}
          user={modalConfig.user}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
}
