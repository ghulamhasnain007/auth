import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface PreventAccessProps {
    children: React.ReactElement;
}

const PreventAccess: React.FC<PreventAccessProps> = ({ children }) => {
    const auth = useContext(AuthContext);

    if (auth?.isAuthenticated) {
        // Redirect admin users to admin dashboard
        if (auth.isAdmin) {
            return <Navigate to="/admin/dashboard" replace />;
        }

        // Redirect normal users to user dashboard
        return <Navigate to="/dashboard" replace />;
    }

    // Allow access to the children (e.g., login/signup) if not authenticated
    return children;
};

export default PreventAccess;
