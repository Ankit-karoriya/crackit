import { createContext, useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/users/check-auth`, {withCredentials: true});
                if(res.data.loggedIn){
                    setAuth(true);
                    if(res.data?.user){
                        setUser(res.data.user);
                    } else {
                        setAuth(false);
                        setUser({});
                    }
                }
            } catch (error) {
                setAuth(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    if(loading) return <div>Loading...</div>

    return (
        <AuthContext.Provider value={{auth, setAuth, user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}