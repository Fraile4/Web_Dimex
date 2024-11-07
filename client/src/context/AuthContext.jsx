import { createContext, useState, useContext } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth'
import Cookies from 'js-cookie'
import { useEffect } from "react";
import { set } from "mongoose";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [PaP, setPaP] = useState(false);
    const [CC, setCC] = useState(false);

    // clear errors after 5 seconds
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user)
            console.log(res.data)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            setErrors(error.response.data.message)
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            //console.log(res)
            setIsAuthenticated(true)
            setUser(res.data)
            //console.log(user.email)
            //console.log(res.data.puesto)
            if (user.email === 'admin@admin.com') setIsAdmin(true);
            if (res.data.puesto === 'PaP') setPaP(true);
            if (res.data.puesto === 'CC') setCC(true);

            setIsAuthenticated(true)
        } catch (error) {
            if (Array.isArray(error.response.data.message)) {
                return setErrors(error.response.data.message)
            }
            setErrors([error.response.data.message])
        }
    }

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
        setPaP(false);
        setCC(false);
    };

      useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()

            if (!cookies.token) {
                setIsAuthenticated(false)
                setLoading(false)
                return setUser(null)
            }

            try {
                const res = await verifyTokenRequest(cookies.token)
                if (!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                }
                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
        }
        checkLogin()
    }, []);

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            user,
            isAuthenticated,
            isAdmin,
            errors,
            loading,
            PaP,
            CC
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;