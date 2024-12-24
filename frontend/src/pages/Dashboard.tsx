// import React from 'react'

// import { logout } from "../components/ApiHandler/user.apihandler";

import axios from "axios"
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { setUser, setIsAuthenticated }: any = useContext(AuthContext)
  const navigate = useNavigate()
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
  return (
    <div>
      <div>
        <button 
          onClick={logout}
          className="p-3 bg-blue-500 text-white rounded text-lg">
          LOG OUT
        </button>  
      </div>  
      Dashboard
    </div>
  )
}
