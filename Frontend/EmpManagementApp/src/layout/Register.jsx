import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [empid, setEmpid] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('EmpId:', empid, 'Username:', username, 'Password:', password);

        try {
            const response = await axios.post('http://localhost:8080/register', {
                empid,
                username,
                password,
            });

            // navigate
            navigate('/login');
            console.log('Registration successful:', response.data);
        } catch (err) {
            setError('Đăng ký thất bại');
            console.error('Registration error:', err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-1 text-gray-600">User ID</label>
                        <input
                            type="text"
                            value={empid}
                            onChange={(e) => setEmpid(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your ID"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-600">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-600">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600">
                    Have an account? <Link to="/login" className="text-indigo-600 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
