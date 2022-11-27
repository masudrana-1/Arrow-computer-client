import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import AdminLink from './AdminLink';

const Admin = () => {

    const [users, setUsers] = useState();

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    return (
        <div>
            {
                users?.map(user => <AdminLink key={user?._id} user={user}></AdminLink>)
            }
        </div>


    );
};

export default Admin;