import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactElement;
    adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly }) => {
    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    if (!auth) {
        return <div>Loading...</div>;
    }

    // Watch for changes in authentication state and navigate
    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate("/", { replace: true });
        } else if (adminOnly && !auth.isAdmin) {
            navigate("/dashboard", { replace: true });
        } else if (!adminOnly && auth.isAdmin) {
            navigate("/admin/dashboard", { replace: true });
        }
    }, [auth.isAuthenticated, auth.isAdmin, navigate]);

    // Render children if conditions are met
    if (auth.isAuthenticated && (!adminOnly || auth.isAdmin)) {
        return children;
    }

    return null; // Prevent rendering if navigation is pending
};




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

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly }) => {
//     const auth = useContext(AuthContext);
    
//     if (!auth) {
//         return <div>Loading...</div>; // Or a more appropriate loading indicator
//     }
//     console.log("from Routes: ", auth);
    

//     if (!auth.isAuthenticated) {
//         return <Navigate to="/" replace />;
//     }

//     if (!adminOnly && auth.isAdmin) {
//         return <Navigate to="/admin/dashboard" replace />;
//     }
    
//     if (adminOnly && !auth.isAdmin) {
//         return <Navigate to="/dashboard" replace />;
//     }
//     // if (adminOnly && auth.isAdmin) {
//     //     return <Navigate to="/admin/dashboard" replace />;
//     // }
    
//     return children;
// };

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

