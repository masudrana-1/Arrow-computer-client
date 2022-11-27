import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
    return (
        <div>
            <div>
                <Link className='btn btn-ghost mb-5' to='/dashboard/admin/seller'>All Seller</Link>
            </div>
            <Link className='btn btn-ghost ' to='/dashboard/admin/buyer'>All Buyer</Link>

        </div>


    );
};

export default Admin;