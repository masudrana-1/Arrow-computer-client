import React from 'react';
import { Link } from 'react-router-dom';

const Buyer = () => {
    return (
        <div>
            <Link to='/dashboard/buyer/order' className='btn btn-ghost mb-3'>My Order</Link>
            <div>
                <Link to='/dashboard/buyer/wishlist' className='btn btn-ghost'>My Wishlist</Link>
            </div>
        </div>
    );
};

export default Buyer;