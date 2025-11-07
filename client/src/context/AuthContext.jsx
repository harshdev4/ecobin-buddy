import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from '../utils/axiosInstance.js'
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    // 🔹 Check if logged in (auto-login)
    useEffect(() => {
        const checkAuth = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get("/me");
                setUser(res.data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);




    // 🔹 Logout
    const logout = async () => {
        try {
            const res = await axiosInstance.post("/logout");
            setUser(null);
            toast.success("Logout successfully");
        } catch (error) {
            console.log("something went wrong");
            toast.error("Something went wrong");
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
