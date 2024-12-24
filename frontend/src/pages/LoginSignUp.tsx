


import axios from 'axios';
// import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// import { AuthContext } from '../context/AuthContext';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const auth = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth?.isAuthenticated) {
            if (auth.isAdmin) {
                navigate('/admin/dashboard', { replace: true });
            } else {
                navigate('/dashboard', { replace: true });
            }
        }
    }, [auth, navigate]);
  //   useEffect(() => {
  //     if (auth?.isAuthenticated) {
  //         const destination = auth.isAdmin ? '/admin/dashboard' : '/dashboard';
  //         navigate(destination, { replace: true });
  //     }
  // }, [auth?.isAuthenticated, auth?.isAdmin, navigate]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  // const { setIsAuthenticated}:any = useContext(AuthContext)
  // const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setServerError(null);

    try {
        const response = await axios.post(
            "http://localhost:3000/api/login",
            { email: data.email, password: data.password },
            { withCredentials: true }
        );

        const user = response.data.user;
        // const token = response.data.token;

        // Update localStorage
        localStorage.setItem("user", JSON.stringify(user));
        // localStorage.setItem("token", token);
        localStorage.setItem("token", JSON.stringify(response.data.token));

        // Update AuthContext
        auth?.setUser(user);
        auth?.setIsAuthenticated(true);
        auth?.setIsAdmin(user.isAdmin);

        // Redirect based on role
        if (user.isAdmin) {
            navigate("/admin/dashboard", { replace: true });
        } else {
            navigate("/dashboard", { replace: true });
        }
    } catch (error: any) {
        setServerError(error.response?.data?.message || "An error occurred during login.");
    } finally {
        setLoading(false);
    }
};




  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          {serverError && (
            <p className="text-red-500 text-sm text-center mb-4">{serverError}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline focus:outline-none">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;


