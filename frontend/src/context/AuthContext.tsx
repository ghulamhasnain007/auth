// import React, { createContext, useState, ReactNode, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// // import {jwtDecode} from 'jwt-decode';
// // import { getDecodedToken } from '../utils/auth';

// // interface DecodedToken {
// //     id: string;
// //     isAdmin: boolean;
// //     exp: number;
// // }

// interface AuthContextProps {
//     isAdmin: boolean;
//     isAuthenticated: boolean;
//     user? : User;
//     setUser: any;
//     setIsAdmin: any;
//     setIsAuthenticated: any;
// }

// interface AuthProviderProps {
//     children: ReactNode;
// }
// interface User {
//     id: number;
//     username: string;
//     isAdmin: Boolean;
// }

// export const AuthContext = createContext<AuthContextProps | null>(null);

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//     const [ user, setUser ] = useState<User>();
//     const [isAdmin, setIsAdmin] = useState<boolean>(false);
//     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//     const navigate = useNavigate()

//     // useEffect(() => {
//     //     // const decoded = getDecodedToken();
//     //     if (user) {
//     //         // setIsAdmin(decoded.isAdmin);
//     //         setIsAuthenticated(true);
//     //     } else {
//     //         setIsAuthenticated(false);
//     //         console.log(user);
            
//     //     }
//     //     if(user?.isAdmin){
//     //         console.log(user?.isAdmin);
//     //         setIsAdmin(true)
//     //     }
//     //     else{
//     //         setIsAdmin(false)
//     //     }
//     // }, [user]);

//     useEffect(() => {
//         // On page load, try to get the user from localStorage
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//           setUser(JSON.parse(storedUser));
//           setIsAuthenticated(true)
//         }else{
//             navigate('/')
//         }

//         if(user?.isAdmin){
//             setIsAdmin(true)
//             navigate('/admin/dashboard')
//         }
//         else{
//             navigate('/dashboard')
//         }
//       }, []);

//     return (
//         <AuthContext.Provider value={{ isAdmin, isAuthenticated, user, setUser, setIsAdmin, setIsAuthenticated }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };


import React, { createContext, useState, ReactNode, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
    isAdmin: boolean;
    isAuthenticated: boolean;
    user?: User;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: number;
    username: string;
    isAdmin: boolean;
}
export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | undefined>();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // Add loading state

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            console.log("from Context: ", parsedUser);

            setIsAuthenticated(true);
            setIsAdmin(parsedUser.isAdmin);
        } else {
            setIsAuthenticated(false);
        }
        setLoading(false); // Set loading to false once authentication check is done
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Or a more appropriate loading indicator
    }

    return (
        <AuthContext.Provider value={{ isAdmin, isAuthenticated, user, setUser, setIsAdmin, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
