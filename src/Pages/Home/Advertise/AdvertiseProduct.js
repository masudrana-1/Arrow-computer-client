import React from 'react';

const AdvertiseProduct = ({ product }) => {

    const { title, img, location, resale_price, details } = product;

    return (
        <div className="card w-96 bg-base-100 shadow-xl shadow-red-500/50 m-auto h-[600px]">
            <img className='h-[400px] rounded-lg' src={img} alt="Shoes" />
            <div className="card-body">
                <h2 className="card-title">
                    {title}
                    <div className="badge badge-secondary">AD</div>
                </h2>
                <p>{details}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline shadow-lg shadow-red-500/50">Price: {resale_price}</div>
                    <div className="badge badge-outline shadow-lg shadow-red-500/50">{location}</div>
                </div>
            </div>
        </div>
    );
};

export default AdvertiseProduct;