import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Product from './Product';

const Products = () => {

    const { data: products = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/products');
            const data = await res.json();
            return data;
        }
    });

    return (
        <div>
            <h1 className='text-4xl font-bold'>All Products</h1>
            {/* <div>
                {
                    products.map(product => <Product key={product._id} product={product}></Product>)
                }
            </div> */}
            <div>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        {/* <!-- head --> */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Product</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <!-- row 1 --> */}
                            {
                                products.map((product, i) => <>
                                    <tr>
                                        <th>
                                            {i + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={product?.img} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{product?.title}</div>
                                                    <div className="text-sm opacity-50">{product?.location}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {product?.resale_price}
                                            <br />
                                            <span className="badge badge-ghost badge-sm">
                                                {product?.original_price}
                                            </span>
                                        </td>
                                        <td>{product?.product_type}</td>
                                        <th>
                                            <button className="btn btn-error btn-xs">Delete</button>
                                        </th>
                                    </tr>
                                </>)
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default Products;