// import { useQuery } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loader from '../../../Shared/Loader/Loader';
import Category from './Category';

const ProductCategories = () => {

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('https://arrow-computer-server.vercel.app/categories');
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='my-10'>
            <h1 className='text-5xl mb-2 text-center'>All Product Categories</h1>
            <p className='text-center mb-12'>Here you can find best quality used computer, laptop and accessories. Choose your favorite product.</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    categories.map((category, i) => <Category key={i} category={category}></Category>)
                }
            </div>
        </div>
    );
};

export default ProductCategories;