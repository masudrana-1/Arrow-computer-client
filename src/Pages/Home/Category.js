import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl m-auto">
            <figure><img className='h-60 w-full' src={category?.img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title m-auto">{category?.title}</h2>
                <Link className='btn btn-primary' to=''>Show All Products</Link>
            </div>
        </div>
    );
};

export default Category;