import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import useAdmin from '../../../hook/useAdmin';

const AdminRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);

    const location = useLocation();

    if (loading || isAdminLoading) {
        return <progress className="progress w-56 m-auto"></progress>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to='/login' state={{ form: location }} replace></Navigate>;
};

export default AdminRoute;