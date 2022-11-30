import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthProvider';
import Loader from '../../../../Shared/Loader/Loader';

const Wishlist = () => {

    const { user } = useContext(AuthContext);

    const url = `http://localhost:5000/wishlist?email=${user?.email}`

    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data
        }
    })


    // console.log(products)

    const handleDeleteProduct = product => {
        fetch(`http://localhost:5000/wishlist/${product?._id}`, {
            method: 'DELETE'
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {

                console.log(data);
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${product?.title} deleted successfully`);
                }
            })
    }


    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div>
            <h1 className='text-4xl text-center my-6'>All Product</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {
                            products.map((product, i) => <tr
                                key={product._id}
                            >
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
                                            <div className="font-bold">{product?.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {product?.title}
                                </td>
                                <td>
                                    {product?.price}
                                </td>
                                <th>
                                    <Link to={`/products/${product?.product_type}`} className='btn btn-primary btn-xs'>Order</Link>
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
    );
};

export default Wishlist;