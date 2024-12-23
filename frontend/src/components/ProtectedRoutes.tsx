import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactElement;
    adminOnly?: boolean;
}

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly }) => {
//     const auth = useContext(AuthContext);
    
//     if (!auth?.isAuthenticated) {
//         // Redirect to login if not authenticated
//         return <Navigate to="/" replace />;
//     }

//     if (adminOnly && !auth.isAdmin) {
//         // Redirect to dashboard if trying to access admin route but not admin
//         return <Navigate to="/dashboard" replace />;
//     }

//     return children;
// };

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly }) => {
    const auth = useContext(AuthContext);
    
    if (!auth) {
        return <div>Loading...</div>; // Or a more appropriate loading indicator
    }
    console.log("from Routes: ", auth);
    

    if (!auth.isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (!adminOnly && auth.isAdmin) {
        return <Navigate to="/admin/dashboard" replace />;
    }
    
    if (adminOnly && !auth.isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }
    // if (adminOnly && auth.isAdmin) {
    //     return <Navigate to="/admin/dashboard" replace />;
    // }
    
    return children;
};

export default ProtectedRoute;


// import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// interface ProtectedRouteProps {
//     children: React.ReactElement;
//     adminOnly?: boolean;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly }) => {
//     const auth = useContext(AuthContext);
    
//     if (auth?.isAuthenticated) {
//         // Redirect to the dashboard if the user is already logged in
//         return <Navigate to={adminOnly ? '/admin/dashboard' : '/dashboard'} />;
//     }

//     if (adminOnly && !auth?.isAdmin) {
//         return <Navigate to="/dashboard" />;
//     }

//     return children;
// };

// export default ProtectedRoute;

