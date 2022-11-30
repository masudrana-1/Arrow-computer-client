import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loader from '../../../../Shared/Loader/Loader';

const AllBuyer = () => {

    // const [buyers, setBuyers] = useState();

    // useEffect(() => {
    //     fetch('https://arrow-computer-server.vercel.app/users/Buyer')
    //         .then(res => res.json())
    //         .then(data => setBuyers(data))
    // }, [])

    const { data: buyers = [], refetch, isLoading } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch(`https://arrow-computer-server.vercel.app/users/Buyer`);
            const data = await res.json();
            return data
        }
    })


    const handleDeleteBuyer = buyer => {
        fetch(`https://arrow-computer-server.vercel.app/users/${buyer?._id}`, {
            method: 'DELETE'
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${buyer?.name} deleted successfully`);
                }
            })
    }

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div>
            <h1>ALL BUYER</h1>
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
                            buyers?.map((buyer, i) => <tr key={buyer?._id}>
                                <th>{i + 1}</th>
                                <td>{buyer?.name}</td>
                                <td>{buyer?.email}</td>
                                <th>
                                    <button onClick={() => handleDeleteBuyer(buyer)} className="btn btn-error btn-xs">Delete</button>
                                </th>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllBuyer;