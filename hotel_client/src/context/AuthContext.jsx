import { createContext, useState, useEffect } from "react";
import axios from "../api/http";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState(null);

    const fetchUser = async () => {
        try {
            const res = await axios.get("http://localhost:5007/api/user/me", {
                withCredentials: true, 
            });
            setUserEmail(res.data.email);
        } catch (err) {
            console.error( err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ userEmail, setUserEmail }}>
            {children}
        </AuthContext.Provider>
    );
};