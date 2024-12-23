import axios from 'axios';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

const Signup: React.FC = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async(data) => {
        if (data.password !== data.confirmPassword) {
        alert('Passwords do not match!');
        return;
        }
        const response = await axios.post('http://localhost:3000/api/register', {
            username: data.username,
            email: data.email,
            password: data.password
        })
        console.log(response)
        navigate('/')
        console.log('Signup successful!', data);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters long',
                },
              })}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>
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
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
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
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-gray-600 font-medium mb-2">
                Confirm Password
                </label>
                <input
                type="password"
                id="confirmPassword"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                    },
                })}
                />
                {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
                Sign Up
            </button>
            </form>
            <p className="text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to={'/'} className="text-blue-500 hover:underline focus:outline-none">
                Login
            </Link>
            </p>
        </div>
        </div>
    );
};
export default Signup