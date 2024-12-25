import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { UpdateModal } from "../components/UpdateModal";

type Todo = {
  todo_id?: number;
  task: string;
  description?: string;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [todo, setTodo] = useState<Todo[]>([]);
  const { user, setUser, setIsAuthenticated }: any = useContext(AuthContext);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    mode: "add" as "add" | "edit",
    user: null as Todo | null,
  });

  const token = localStorage.getItem("token");
  const tokenValue = token ? JSON.parse(token).token : null;

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/todos/${user.id}`, {
        headers: { Authorization: `Bearer ${tokenValue}` },
      });
      setTodo(response.data.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
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

  const openModal = (mode: "add" | "edit", user: Todo | null = null) => {
    setModalConfig({ isOpen: true, mode, user });
  };

  const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });

  const handleModalSubmit = async (formData: Todo) => {
    try {
      if (modalConfig.mode === "add") {
        await axios.post(
          "http://localhost:3000/api/todos/create-todo",
          {
            task: formData.task,
            description: formData.description,
            createdBy: user.id,
          },
          { headers: { Authorization: `Bearer ${tokenValue}` } }
        );
      } else if (formData.todo_id) {
        await axios.patch(`http://localhost:3000/api/todos/${formData.todo_id}/update`, formData, {
          headers: { Authorization: `Bearer ${tokenValue}` },
        });
      }
      fetchTodos();
      closeModal();
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/todos/${todoId}/delete`, {
        headers: { Authorization: `Bearer ${tokenValue}` },
      });
      setTodo((prevTodos) => prevTodos.filter((todo) => todo.todo_id !== todoId));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <div className="p-5">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 md:space-x-4">
        <button
          className="px-5 py-2 text-white bg-green-600 rounded hover:bg-green-700"
          onClick={() => openModal("add")}
        >
          Add Todo
        </button>
        <button
          className="px-5 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          onClick={logout}
        >
          Log Out
        </button>
      </div>
      <h1 className="text-2xl font-bold mt-5">{user.username}</h1>

      <div className="w-full overflow-x-auto mt-5">
        <div className="bg-gray-200 p-3 rounded-t flex justify-between font-bold text-sm md:text-base">
          <div className="flex-1 md:w-1/3 truncate">Tasks</div>
          <div className="flex-1 md:w-1/3 truncate">Description</div>
          <div className="flex-1 md:w-1/3 text-right">Actions</div>
        </div>

        {todo.length > 0 ? (
          <ul className="divide-y divide-gray-300">
            {todo.map((todo) => (
              <li
                key={todo.todo_id}
                className="p-3 flex flex-wrap md:flex-nowrap items-center space-y-3 md:space-y-0 hover:bg-gray-100"
              >
                <div className="flex-1 md:w-1/3 text-gray-800 truncate">{todo.task}</div>
                <div className="flex-1 md:w-1/3 text-gray-800 break-words">
                  {todo.description || "No description provided"}
                </div>
                <div className="flex-1 md:w-1/3 flex justify-end space-x-4">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => openModal("edit", todo)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteTodo(todo.todo_id!)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No todos found.</p>
        )}
      </div>

      {modalConfig.isOpen && (
        <UpdateModal
          isOpen={modalConfig.isOpen}
          title={modalConfig.mode === "add" ? "Add New Task" : "Edit Task"}
          todo={modalConfig.user}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
}




// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import axios from "axios";
// import { UpdateModal } from "../components/UpdateModal";

// type Todo = {
//   todo_id?: number; // Optional for "add" mode
//   task: string;
//   description?: string;
// };

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const [todo, setTodo] = useState<Todo[]>([]);
//   const { user, setUser, setIsAuthenticated }: any = useContext(AuthContext);
//   const [modalConfig, setModalConfig] = useState({
//     isOpen: false,
//     mode: "add" as "add" | "edit",
//     user: null as Todo | null,
//   });

//   const token = localStorage.getItem("token");
//   const tokenValue = token ? JSON.parse(token).token : null;

//   const fetchTodos = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/api/todos/${user.id}`,
//         {
//           headers: { Authorization: `Bearer ${tokenValue}` },
//         }
//       );
//       setTodo(response.data.data);
//     } catch (error) {
//       console.error("Failed to fetch todos:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTodos();
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

//   const openModal = (mode: "add" | "edit", user: Todo | null = null) => {
//     setModalConfig({ isOpen: true, mode, user });
//   };

//   const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });

//   const handleModalSubmit = async (formData: Todo) => {
//     try {
//       if (modalConfig.mode === "add") {
//         const response = await axios.post(
//           "http://localhost:3000/api/todos/create-todo",
//           {
//             task: formData.task,
//             description: formData.description,
//             createdBy: user.id,
//           },
//           {
//             headers: { Authorization: `Bearer ${tokenValue}` },
//           }
//         );
//         setTodo(response.data.data);
//       } else if (formData.todo_id) {
//         await axios.patch(
//           `http://localhost:3000/api/todos/${formData.todo_id}/update`,
//           formData,
//           {
//             headers: { Authorization: `Bearer ${tokenValue}` },
//           }
//         );
//       }
//       fetchTodos();
//       closeModal();
//     } catch (error) {
//       console.error("Failed to submit form:", error);
//     }
//   };

//   const handleDeleteTodo = async (todoId: number) => {
//     try {
//       await axios.delete(
//         `http://localhost:3000/api/todos/${todoId}/delete`,
//         {
//           headers: { Authorization: `Bearer ${tokenValue}` },
//         }
//       );
//       setTodo((prevTodos) => prevTodos.filter((todo) => todo.todo_id !== todoId));
//     } catch (error) {
//       console.error("Failed to delete todo:", error);
//     }
//   };

//   return (
//     <div className="p-5 max-w-4xl mx-auto">
//       <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 md:space-x-4">
//         <button
//           className="px-5 py-2 text-white bg-green-600 rounded hover:bg-green-700"
//           onClick={() => openModal("add")}
//         >
//           Add Todo
//         </button>
//         <button
//           className="px-5 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
//           onClick={logout}
//         >
//           Log Out
//         </button>
//       </div>

//       <h1 className="text-2xl font-bold mt-5 text-center md:text-left">Welcome, {user.username}</h1>

//       <div className="mt-5">
//         <div className="bg-gray-200 p-3 rounded-t grid grid-cols-3 font-bold text-gray-700">
//           <div>Task</div>
//           <div>Description</div>
//           <div className="text-center">Actions</div>
//         </div>

//         {todo.length > 0 ? (
//           <ul className="divide-y divide-gray-300">
//             {todo.map((todo) => (
//               <li
//                 key={todo.todo_id}
//                 className="p-3 grid grid-cols-1 md:grid-cols-3 gap-4 items-center hover:bg-gray-100"
//               >
//                 <div className="truncate">{todo.task}</div>
//                 <div className="truncate">
//                   {todo.description || "No description provided"}
//                 </div>
//                 <div className="flex justify-center md:justify-end space-x-4">
//                   <button
//                     className="text-blue-600 hover:text-blue-800"
//                     onClick={() => openModal("edit", todo)}
//                   >
//                     <FaEdit />
//                   </button>
//                   <button
//                     className="text-red-600 hover:text-red-800"
//                     onClick={() => handleDeleteTodo(todo.todo_id!)}
//                   >
//                     <FaTrash />
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500 text-center">No todos found. Add one to get started!</p>
//         )}
//       </div>

//       {modalConfig.isOpen && (
//         <UpdateModal
//           isOpen={modalConfig.isOpen}
//           title={modalConfig.mode === "add" ? "Add New Todo" : "Edit Todo"}
//           todo={modalConfig.user}
//           onClose={closeModal}
//           onSubmit={handleModalSubmit}
//         />
//       )}
//     </div>
//   );
// }

