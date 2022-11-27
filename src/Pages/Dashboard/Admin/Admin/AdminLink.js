import React from 'react';
import { Link } from 'react-router-dom';

const AdminLink = ({ user }) => {
    return (
        <div>
            <Link to={`/dashboard/admin/${user?.role}`}>ALL {user?.role}</Link>
        </div>
    );
};

export default AdminLink;