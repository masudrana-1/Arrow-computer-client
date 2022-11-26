import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Product from './Product';

const AllProducts = () => {

    const products = useLoaderData();
    console.log(products);

    // const { title, img, product_type } = products;

    return (
        <div className=''>
            <div className='w-5/6 m-auto'>
                {
                    products.map(product => <Product key={product._id} product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default AllProducts;