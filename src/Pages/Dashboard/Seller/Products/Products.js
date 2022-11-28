import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loader from '../../../../Shared/Loader/Loader';

const Products = () => {

    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/products');
            const data = await res.json();
            return data;
        }
    });


    const handleDeleteProduct = product => {
        // console.log(doctor)
        fetch(`http://localhost:5000/products/${product?.title}`, {
            method: 'DELETE'
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${product?.product_title} deleted successfully`);
                }
            })

        fetch(`http://localhost:5000/productCart/${product?.title}`, {
            method: 'DELETE'
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    // toast.success(`${product?.title} deleted successfully`);
                }
            })

    }

    const handleAdvertise = (product) => {
        const advertise = {
            seller_name: product.seller_name,
            title: product.title,
            img: product.img,
            location: product.location,
            original_price: product.original_price,
            resale_price: product.resale_price,
            product_type: product.product_type,
            details: product.details,
            post_time: product.post_time
        }

        // console.log(advertise)

        fetch('http://localhost:5000/advertise', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                // authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(advertise)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                toast.success(`${product.title} is advertise successfully`);
                // navigate('/dashboard/seller/products');
            })
    }


    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div>
            <h1 className='text-4xl font-bold text-center mb-6'>All Products</h1>
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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <!-- row 1 --> */}
                            {
                                products.map((product, i) => <tr key={i}>
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
                                        <button onClick={() => handleAdvertise(product)} className="btn btn-primary btn-xs">Advertise</button>
                                    </th>
                                    <th>
                                        <button onClick={() => handleDeleteProduct(product)} className="btn btn-error btn-xs">Delete</button>
                                    </th>
                                </tr>)
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default Products;