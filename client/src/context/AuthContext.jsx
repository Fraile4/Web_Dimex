import { createContext, useState, useContext } from "react";
import { registerRequest, loginRequest } from '../api/auth'
import { useEffect } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
    const context =  useContext(AuthContext);
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
        try{
            const res = await registerRequest(user)
            console.log(res.data)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            setErrors(error.response.data.message)
        }
    }

    const signin = async (user) => {
        try{
            const res = await loginRequest(user)
            console.log(res.data)
            setUser(res.data)
            console.log(user.email)
            if (user.email === 'admin@admin.com') setIsAdmin(true)
            setIsAuthenticated(true)
        } catch (error) {
            if (Array.isArray(error.response.data.message)) {
                return setErrors(error.response.data.message)
            }
            setErrors([error.response.data.message])
        }
    }

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            user,
            isAuthenticated,
            isAdmin,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    );
}