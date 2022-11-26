import React from 'react';

const Product = ({ product }) => {

    const { title, img, location, original_price, resale_price, seller_name, post_time, years_of_use, details } = product;

    return (
        <div className="card card-side bg-base-100 shadow-xl my-5 ">
            <figure><img className='w-96 h-96' src={img} alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>Details: {details}</p>
                <p className='text-lg'>Location: {location}</p>
                <p className='text-lg'>Original Price: {original_price} TK.</p>
                <p className='text-lg'>Resale Price: {resale_price} TK.</p>
                <p className='text-lg'>Year of used: {years_of_use} year</p>
                <p className='text-lg'>Seller: {seller_name}</p>
                <p className='text-lg'>Time: {post_time} PM</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy now</button>
                </div>
            </div>
        </div>
    );
};

export default Product;