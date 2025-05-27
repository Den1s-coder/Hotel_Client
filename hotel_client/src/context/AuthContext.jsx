import { createContext, useState, useEffect } from "react";
import axios from "../api/http";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState(null);
    const [userRole, setUserRole] = useState(null);

    const fetchUser = async () => {
        try {
            const res = await axios.get("http://localhost:5007/api/user/me", {
                withCredentials: true,
            });
            setUserEmail(res.data.email);
            setUserRole(res.data.role)
        } catch (err) {
            console.error(err);
            setUserEmail(null);
            setUserRole(null);
        }
    };

    const logout = async () => {
        try {
            await axios.post("http://localhost:5007/api/auth/logout"), {
                withCredentials: true,
            };
            setUserEmail(null);
            setUserRole(null);
        } catch (err) {
            console.error("Logout error:", err);
        }
    }

        useEffect(() => {
            fetchUser();
        }, []);

        return (
            <AuthContext.Provider value={{ userEmail, setUserEmail, userRole, setUserRole, logout }}>
                {children}
            </AuthContext.Provider>
        );
};
