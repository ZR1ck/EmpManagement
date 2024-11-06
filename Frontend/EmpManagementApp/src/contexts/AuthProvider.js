import React, { createContext, useContext, useEffect, useState } from 'react';
import { isTokenExpired } from '../utils/tokenUtils';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !isTokenExpired(token)) {
            setIsAuthenticated(true);
            // Fetch thông tin người dùng từ API
            const empId = jwtDecode(token).userId;

            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/employee/${empId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data);
                    console.log(response.data);
                } catch (e) {
                    setError(e);
                    console.error("Error fetching user data:", e);
                } finally {
                    setLoading(false);
                }
            };

            fetchUserData();
        } else {
            logout();
            setLoading(false);
        }
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
