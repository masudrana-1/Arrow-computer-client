import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllBuyer = () => {

    // const [buyers, setBuyers] = useState();

    // useEffect(() => {
    //     fetch('http://localhost:5000/users/Buyer')
    //         .then(res => res.json())
    //         .then(data => setBuyers(data))
    // }, [])

    const { data: buyers = [], refetch, isLoading } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/Buyer`);
            const data = await res.json();
            return data
        }
    })


    const handleDeleteBuyer = buyer => {
        fetch(`http://localhost:5000/users/${buyer?._id}`, {
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