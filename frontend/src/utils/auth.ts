// import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    id: string;
    isAdmin: boolean;
    exp: number; // Example field, depends on your token structure
}

// export const getTokenFromCookies = (): string | null => {
//     const cookie = document.cookie
//         .split('; ')
//         .find(row => row.startsWith('token='));
//     return cookie ? cookie.split('=')[1] : null; // Returns the token or null if not found
// };

// export const getIsAdminFromToken = (): boolean | null => {
//     const token = getTokenFromCookies();
//     if (!token) return null;

//     try {
//         const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
//         return decoded.isAdmin; // true or false
//     } catch (error) {
//         console.error("Invalid token:", error);
//         return null;
//     }
// };


import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const login = (token: string) => {
    Cookies.set('token', token, { secure: true, sameSite: 'strict' });
};

export const logout = () => {
    Cookies.remove('token');
    window.location.href = '/'; // Redirect to login page
};

export const getDecodedToken = (): DecodedToken | null => {
    const token = Cookies.get('token');
    if (!token) return null;

    try {
        return jwtDecode<DecodedToken>(token);
    } catch {
        return null;
    }
};
