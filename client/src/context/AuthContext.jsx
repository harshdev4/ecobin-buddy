import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from '../utils/axiosInstance.js'
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [urlLocation, setUrlLocation] = useState("/");
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
            setLoading(true);
            const res = await axiosInstance.post("/logout");
            setUser(null);
            toast.success("Logout successfully");
        } catch (error) {
            toast.error("Something went wrong");
        }finally{
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading, logout, urlLocation, setUrlLocation}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
