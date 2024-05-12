// AuthContext.jsx
import { createContext, useState, useEffect } from 'react';


export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin,setIsAdmin]=useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userRole] = useState(null);

    const login = (token,role) => {
        localStorage.setItem('userToken', token);
        localStorage.setItem('userRole', role);
        setIsAuth(true);
        if(role=="ADMIN")
        {setIsAdmin(true);}
        setUserToken(token);
    };

    const logout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userRole');
        setIsAuth(false);
        setIsAdmin(false);
        setUserToken(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        const role = localStorage.getItem('userRole');
        if (token) {
            if(role=="ADMIN")
                {setIsAdmin(true);}
            setIsAuth(true);
            setUserToken(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAdmin,isAuth, userRole,userToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
