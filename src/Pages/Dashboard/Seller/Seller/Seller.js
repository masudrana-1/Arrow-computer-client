import React from 'react';
import { Link } from 'react-router-dom';

const Seller = () => {
    return (
        <div>
            <div>
                <Link className='btn btn-ghost mb-3' to='/dashboard/seller/addproduct'>Add a product</Link>
            </div>
            <div>
                <Link className='btn btn-ghost mb-3' to='/dashboard/seller/products'>My products</Link>
            </div>
        </div>
    );
};

export default Seller;