import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import Carousel from './Carousel';
import ProductCategories from './ProductCategories';

const Home = () => {

    const { user } = useContext(AuthContext);



    return (

        <div>
            <div className='text-lg text-center my-6'>
                {
                    user?.uid && <h1>
                        "{user?.displayName ? user?.displayName : user?.email}" - Wellcome to Arrow Computer
                    </h1>
                }
            </div>
            <Carousel></Carousel>
            <ProductCategories></ProductCategories>
        </div>

    );
};

export default Home;