import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AdvertiseProduct from './AdvertiseProduct';

const Advertised = () => {

    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/advertise');
            const data = await res.json();
            return data;
        }
    });

    return (
        <div>
            <div className="divider"></div>
            <div className='my-10'>
                <div>
                    {
                        products.length > 0 && <>
                            <h1 className='text-3xl text-center mb-2'>Advertise Product</h1>
                            <p className='text-center mb-6'>Here you can find latest product. So hurry up...</p>
                        </>
                    }
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                    {
                        products.length > 0 && products.map(product => <AdvertiseProduct key={product?._id} product={product}></AdvertiseProduct>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Advertised;