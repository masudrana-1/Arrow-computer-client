import React, { useEffect, useState } from 'react';

const AllSeller = () => {

    const [buyers, setBuyers] = useState();

    useEffect(() => {
        fetch('http://localhost:5000/users/Seller')
            .then(res => res.json())
            .then(data => setBuyers(data))
    }, [])


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
                            buyers?.map((buyer, i) => <tr>
                                <th>{i + 1}</th>
                                <td>{buyer?.name}</td>
                                <td>{buyer?.email}</td>
                                <th>
                                    <button className="btn btn-error btn-xs">Delete</button>
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