import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllSeller = () => {

    const { data: sellers = [], refetch, isLoading } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/Seller`);
            const data = await res.json();
            return data
        }
    })


    const handleDeleteSeller = seller => {
        fetch(`http://localhost:5000/users/${seller?._id}`, {
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