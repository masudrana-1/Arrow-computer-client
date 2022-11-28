import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {

    const { title, img, product_type } = category;

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl m-auto">
            <figure><img className='h-60 w-full' src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title m-auto">{title}</h2>
                <Link className='btn btn-primary' to={`/products/${product_type}`} >Show All Products</Link>
            </div>
        </div>
    );
};

export default Category;