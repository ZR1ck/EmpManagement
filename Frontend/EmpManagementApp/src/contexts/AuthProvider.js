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

    const host = process.env.REACT_APP_API_URL;


    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    const getToken = () => {
        const token = localStorage.getItem('token');
        if (isTokenExpired(token)) {
            logout();
            return null;
        }
        return token;
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !isTokenExpired(token)) {
            setIsAuthenticated(true);
            // Fetch thông tin người dùng từ API
            const empId = jwtDecode(token).userId;

            const fetchUserData = async () => {
                try {
                    const response = await axios.get(host + `api/employee/${empId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data);
                    console.log(response.data);
                    setError(null);
                } catch (e) {
                    setError(e);
                    console.error("Error fetching user data:", e);
                    logout();
                } finally {
                    setLoading(false);
                }
            };

            fetchUserData();
        } else {
            logout();
            setLoading(false);
        }
    }, [isAuthenticated, host]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading, error, login, logout, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
