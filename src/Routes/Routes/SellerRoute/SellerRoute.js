import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import useSeller from '../../../hook/useSeller';

const SellerRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const [isSeller, isSellerLoading] = useSeller(user?.email);

    const location = useLocation();

    if (loading || isSellerLoading) {
        return <progress className="progress w-56 m-auto"></progress>
    }

    if (user && isSeller) {
        return children;
    }

    return <Navigate to='/login' state={{ form: location }} replace></Navigate>;
};

export default SellerRoute;