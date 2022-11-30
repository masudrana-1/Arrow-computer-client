import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loader from '../../../../Shared/Loader/Loader';

const AllSeller = () => {

    const { data: sellers = [], refetch, isLoading } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch(`https://arrow-computer-server.vercel.app/users/Seller`);
            const data = await res.json();
            return data
        }
    })


    const handleDeleteSeller = seller => {
        fetch(`https://arrow-computer-server.vercel.app/users/${seller?._id}`, {
            method: 'DELETE'
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${seller?.name} deleted successfully`);
                }
            })
    }

    const handleVerify = (id) => {
        fetch(`https://arrow-computer-server.vercel.app/users/seller/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify()
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                toast.success('Verified successfully');
            })

    }


    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div>
            <h1>ALL SELLER</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Verified status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {
                            sellers?.map((seller, i) => <tr key={seller?._id}>
                                <th>{i + 1}</th>
                                <td>{seller?.name}</td>
                                <td>{seller?.email}</td>
                                <th>
                                    {
                                        (seller?.verify) && <button className="btn btn-primary btn-xs">verified</button>
                                    }
                                </th>
                                <th>
                                    <button onClick={() => handleVerify(seller._id)} className="btn btn-error btn-xs">verify</button>
                                </th>
                                <th>
                                    <button onClick={() => handleDeleteSeller(seller)} className="btn btn-error btn-xs">Delete</button>
                                </th>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllSeller;