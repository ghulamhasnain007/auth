// import axios from "axios"
// import { AuthContext } from "../../context/AuthContext";
// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";


// const {setUser}: any = useContext(AuthContext)
// const navigate = useNavigate()
// // export const fetchUsers = async () => {
    


// export const logout = async () => {
//     try {
//       await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true });
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//       setUser(null);
//       navigate("/");
//     } catch (error) {
//         console.error("Logout failed:", error);
//     }
// };

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

// export const handleAddUser = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/register",
//         newUser,
//       );
//       console.log(response);
      
//       setShowModal(false);
//       fetchUsers();
//       setNewUser({ username: "", email: "", password: "" });
//     } catch (error) {
//       console.error("Failed to add user:", error);
//     }
//   };


// export const handleEditUser = async(userId: number) => {
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
//     return response;
//   }
//   catch(error){
//     console.log(error);
    
//   }
// }


// export const handleDeleteUser = async(userId: number) => {
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


