// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // Define the type for a sub-user
// interface SubUser {
//   id: string; // or whatever unique identifier is used
//   username: string;
//   email: string;
// }

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const [subUsers, setSubUsers] = useState<SubUser[]>([]); // Initialize as an empty array
//   const { setUser }: any = useContext(AuthContext)
//   // const token = localStorage.getItem('token');
//   // const ab = JSON.parse(token);
//   // console.log(token);
//   // console.log(ab);
//   const token = localStorage.getItem('token'); // Gets the JSON string
//   let tokenValue : any;
//   if (token) {
//     tokenValue = JSON.parse(token).token; // Parses the JSON string back to an object
//     console.log(tokenValue); // Outputs: value
//   }

  
//   // const tokenValue = token ? token.split('=')[1] : '';
//   // console.log(tokenValue);
  
// // if (!token) {
// //   console.error("Token is missing.");
// //   return;
// // }

// const fetchUsers = async () => {
//   try {
//     const response = await axios.get("http://localhost:3000/api/users", {
//       headers: {
//         'Authorization': `Bearer ${tokenValue}`,
//       },
//     });
//     // const response = await axios.get('http://localhost:3000/api/users')
//     console.log(response);
//     setSubUsers(response.data.users);
//   } catch (error) {
//     console.error("Failed to fetch users:", error);
//   }
// };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const logout = async () => {
//     try {
//       await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true });
//       localStorage.removeItem("user");  // Remove the user from localStorage
//       localStorage.removeItem("token");
//       setUser(null);
//       navigate("/");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <div className="p-5">
//     <div>
//       <button>
//         ADD USER
//       </button>
//       <button className="p-5 text-white bg-blue-600" onClick={logout}>
//         LOG OUT
//       </button>
//     </div>
//       <h1 className="text-xl font-bold mt-5">Admin Dashboard</h1>
//       <div className="mt-5">
//         {subUsers.length > 0 ? (
//           <ul className="space-y-3">
//             {subUsers.map((user) => (
//               <li key={user.id} className="p-3 border border-gray-200 rounded shadow">
//                 <h2 className="text-lg font-semibold">{user.username}</h2>
//                 <p className="text-gray-600">{user.email}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500">No users found.</p>
//         )}
//       </div>
//     </div>
//     // <div>
//     //   dashboard
//     // </div>
//   );
// }



// // import React from 'react'

// // export default function AdminDashboard() {
// //   return (
// //     <div>AdminDashboard</div>
// //   )
// // }


// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// // import {useForm, SubmitHandler} from 'react-hook-form';
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { Menu, MenuItem, MenuButton} from '@headlessui/react'

// import axios from "axios";
// import { Modal } from '../components/UserModal'; // Import the Modal component
// import UpdateModal from "../components/UpdateModal";

// interface SubUser {
//   id: number;
//   username: string;
//   email: string;
// }
// // interface FormData {
// //   username: string;
// //   email: string;
// //   password: string;
// // }
// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const [subUsers, setSubUsers] = useState<SubUser[]>([]);
//   const { setUser }: any = useContext(AuthContext);

//   const [showModal, setShowModal] = useState(false);
//   const [editModal, setEditModal] = useState(false);
//   const [newUser, setNewUser] = useState({ username: "", email: "", password: "" });

//   const token = localStorage.getItem("token");
//   let tokenValue: any;
//   if (token) {
//     tokenValue = JSON.parse(token).token;
//   }

//   const [modalConfig, setModalConfig] = useState({
//     isOpen: false,
//     mode: "add" as "add" | "edit",
//     user: null as SubUser | null,
//   });
  
//   const openModal = (mode: "add" | "edit", user: SubUser | null = null) => {
//     setModalConfig({ isOpen: true, mode, user });
//   };
  
//   const closeModal = () => {
//     setModalConfig({ ...modalConfig, isOpen: false });
//   };
  
//   const handleModalSubmit = async (formData: SubUser) => {
//     try {
//       if (modalConfig.mode === "add") {
//         await axios.post("http://localhost:3000/api/register", formData, 
//           {
//             headers: {
//               Authorization: `Bearer ${tokenValue}`
//             }
//           }
//         );
//       } else {
//         await axios.post(`http://localhost:3000/api/user/${formData.id}/update`, formData, 
//           {
//             headers: {
//               Authorization: `Bearer ${tokenValue}`
//             }
//           }
//         );
//       }
//       fetchUsers();
//       closeModal();
//     } catch (error) {
//       console.error("Failed to submit form:", error);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/users", {
//         headers: {
//           Authorization: `Bearer ${tokenValue}`,
//         },
//       });
//       setSubUsers(response.data.users);
//     } catch (error) {
//       console.error("Failed to fetch users:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const logout = async () => {
//     try {
//       await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true });
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//       setUser(null);
//       navigate("/");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const handleAddUser = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/register",
//         newUser,
//         // {
//         //   headers: {
//         //     Authorization: `Bearer ${tokenValue}`,
//         //   },
//         // }
//       );
//       console.log(response);
      
//       setShowModal(false);
//       fetchUsers();
//       setNewUser({ username: "", email: "", password: "" });
//     } catch (error) {
//       console.error("Failed to add user:", error);
//     }
//   };
// const handleEditUser = async(userId: number) => {
//   try {
//     const response = await axios.post(
//       `http://localhost:3000/api/user/${userId}/update`,
//       newUser,
//       {
//         headers: {
//           Authorization: `Bearer ${tokenValue}`,
//         },
//       }
//     );
//     console.log(response);
//     setEditModal(true)
//     fetchUsers()
//     // return response;
//   }
//   catch(error){
//     console.log(error);
    
//   }
// }
// const handleDeleteUser = async(userId: number) => {
//   try {
//     const response = await axios.post(
//       `http://localhost:3000/api/user/${userId}/delete`,
//       newUser,
//       {
//         headers: {
//           Authorization: `Bearer ${tokenValue}`,
//         },
//       }
//     );
//     console.log(response);
//   }
//   catch(error){
//     console.log(error);
    
//   }
// }

//   return (
//     <div className="p-5">
//       <div className="flex space-x-4">
//         <button
//           className="p-5 text-white bg-green-600"
//           onClick={() => openModal("add")}
//         >
//           ADD USER
//         </button>
//         <button className="p-5 text-white bg-blue-600" onClick={logout}>
//           LOG OUT
//         </button>
//       </div>
//       <h1 className="text-xl font-bold mt-5">Admin Dashboard</h1>
//       <div className="mt-5">
//         <div className="bg-gray-200 p-5 mb-10">
//           <ul className="flex flex-row justify-around items-center">
//             <li>Username</li>
//             <li>User Email</li>
//             <li>Actions</li>
//           </ul>
//         </div>
//         {subUsers.length > 0 ? (
//           <ul className="space-y-3">
//             {subUsers.map((user) => (
//               <li key={user.id} className="p-3 border border-gray-200 rounded shadow flex flex-row justify-around items-center">
//                 <h2 className="text-lg font-semibold">{user.username}</h2>
//                 <p className="text-gray-600">{user.email}</p>

//               {/* Edit & Delete Actions */}
//               <div className="hidden sm:flex space-x-10">
//                   <button
//                     onClick={() => openModal("edit")}
//                     className="text-blue-600 hover:text-blue-800"
//                   >
//                     <FaEdit size={18} />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteUser(user.id)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     <FaTrash size={18} />
//                   </button>
//                 </div>

//                 {/* Dropdown for Mobile */}
//                 <div className="sm:hidden">
//                   <Menu as="div" className="relative inline-block">
//                     <Menu.Button className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">
//                       Options
//                     </Menu.Button>
//                     <Menu.Items className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg">
//                       <Menu.Item>
//                         {({ active }) => (
//                           <button
//                             onClick={() => openModal("edit")}
//                             className={`block w-full px-4 py-2 text-left ${
//                               active ? "bg-gray-100" : ""
//                             }`}
//                           >
//                             Edit
//                           </button>
//                         )}
//                       </Menu.Item>
//                       <Menu.Item>
//                         {({ active }) => (
//                           <button
//                             onClick={() => handleDeleteUser(user.id)}
//                             className={`block w-full px-4 py-2 text-left ${
//                               active ? "bg-gray-100" : ""
//                             }`}
//                           >
//                             Delete
//                           </button>
//                         )}
//                       </Menu.Item>
//                     </Menu.Items>
//                   </Menu>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500">No users found.</p>
//         )}
//       </div>

//       {/* Render Modal */}
//       {/* <Modal
//         isOpen={showModal}
//         title="Add New User"
//         onClose={() => setShowModal(false)}
//         onSubmit={handleAddUser}
//       >
//         <div className="space-y-3">
//           <input
//             type="text"
//             placeholder="Username"
//             value={newUser.username}
//             onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={newUser.email}
//             onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={newUser.password}
//             onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//       </Modal>

//       <UpdateModal
//         isOpen={editModal}
//         title="Edit User"
//         onClose={() => setEditModal(false)}
//         onSubmit={(e: any) => handleEditUser(e)}
//       >
//         <div className="space-y-3">
//           <input
//             type="text"
//             placeholder="Username"
//             value={newUser.username}
//             onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={newUser.email}
//             onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={newUser.password}
//             onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//       </UpdateModal> */}
//     </div>
//   );
// }



// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import axios from "axios";
// import { Modal } from "../components/UserModal"; // Ensure proper Modal implementation

// type SubUser = {
//   id?: number; // Optional for "add" mode
//   username: string;
//   email: string;
//   password?: string; // Optional for "edit" mode
// };


// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const [subUsers, setSubUsers] = useState<SubUser[]>([]);
//   const { setUser, setIsAuthenticated }: any = useContext(AuthContext);
//   const [modalConfig, setModalConfig] = useState({
//     isOpen: false,
//     mode: "add" as "add" | "edit",
//     user: null as SubUser | null,
//   });

//   const token = localStorage.getItem("token");
//   const tokenValue = token ? JSON.parse(token).token : null;
  
//   console.log(token);
  

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/users", {
//         headers: { Authorization: `Bearer ${tokenValue}` },
//       });
//       setSubUsers(response.data.users);
//     } catch (error) {
//       console.error("Failed to fetch users:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const logout = async () => {
//     try {
//       await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true });
//       localStorage.clear();
//       setUser(null);
//       setIsAuthenticated(false);
//       navigate("/");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const openModal = (mode: "add" | "edit", user: SubUser | null = null) => {
//     setModalConfig({ isOpen: true, mode, user });
//   };

//   const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });

//   const handleModalSubmit = async (formData: SubUser) => {
//     try {
//       if (modalConfig.mode === "add") {
//         await axios.post("http://localhost:3000/api/register", formData, {
//           headers: { Authorization: `Bearer ${tokenValue}` },
//         });
//       } else if (formData.id) {
//         console.log(formData.id)
//         await axios.patch(`http://localhost:3000/api/user/${formData.id}/update`, formData, {
//           headers: { Authorization: `Bearer ${tokenValue}` },
//         });
//       }
//       fetchUsers();
//       closeModal();
//     } catch (error) {
//       console.error("Failed to submit form:", error);
//     }
//   };
  

//   const handleDeleteUser = async (userId: number) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/user/${userId}/delete`, {
//         headers: { Authorization: `Bearer ${tokenValue}` },
//       });
//       // await axios.delete(`http://localhost:3000/api/user/${userId}/delete`)
//       fetchUsers();
//     } catch (error) {
//       console.error("Failed to delete user:", error);
//     }
//   };

//   return (
//     <div className="p-5">
//       <div className="flex space-x-4">
//         <button
//           className="p-5 text-white bg-green-600"
//           onClick={() => openModal("add")}
//         >
//           ADD USER
//         </button>
//         <button className="p-5 text-white bg-blue-600" onClick={logout}>
//           LOG OUT
//         </button>
//       </div>
//       <h1 className="text-xl font-bold mt-5">Admin Dashboard</h1>
//       <div className="mt-5">
//         {subUsers.length > 0 ? (
//           <ul className="space-y-3">
//             {subUsers.map((user) => (
//               <li
//                 key={user.id}
//                 className="p-3 border border-gray-200 rounded shadow flex justify-between items-center"
//               >
//                 <div>
//                   <h2 className="text-lg font-semibold">{user.username}</h2>
//                   <p className="text-gray-600">{user.email}</p>
//                 </div>
//                 <div className="flex space-x-3">
//                   <button onClick={() => openModal("edit", user)}>
//                     <FaEdit className="text-blue-600 hover:text-blue-800" />
//                   </button>
//                   <button onClick={() => handleDeleteUser(user?.id!)}>
//                     <FaTrash className="text-red-600 hover:text-red-800" />
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500">No users found.</p>
//         )}
//       </div>
//       {modalConfig.isOpen && (
//         <Modal
//           isOpen={modalConfig.isOpen}
//           title={modalConfig.mode === "add" ? "Add New User" : "Edit User"}
//           mode={modalConfig.mode}
//           user={modalConfig.user}
//           onClose={closeModal}
//           onSubmit={handleModalSubmit}
//         />
//       )}
//     </div>
//   );
// }







import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { Modal } from "../components/UserModal"; // Ensure proper Modal implementation

type SubUser = {
  id?: number; // Optional for "add" mode
  username: string;
  email: string;
  password?: string; // Optional for "edit" mode
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [subUsers, setSubUsers] = useState<SubUser[]>([]);
  const { setUser, setIsAuthenticated }: any = useContext(AuthContext);
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
      <h1 className="text-2xl font-bold mt-5">Admin Dashboard</h1>

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
