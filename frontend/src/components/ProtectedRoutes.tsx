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

export default ProtectedRoute;
