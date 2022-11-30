import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../context/AuthProvider';
import Loader from '../../../../Shared/Loader/Loader';

const Products = () => {

    const { user } = useContext(AuthContext);

    const url = `http://localhost:5000/products?email=${user?.email}`

    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }
    });


    const handleDeleteProduct = product => {
        fetch(`http://localhost:5000/products/${product?._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${product?.title} deleted successfully`);
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
            post_time: product.post_time,
            product_id: product._id
        }


        fetch('http://localhost:5000/advertise', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(advertise)
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result);
                toast.success(`${product.title} is advertise successfully`);
            })
    }



    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div>
            <h1 className='text-4xl font-bold text-center mb-6'>All Products</h1>
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