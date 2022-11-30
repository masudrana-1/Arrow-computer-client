import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import Advertised from '../Advertise/Advertised';
import Carousel from '../Carousel/Carousel';
import ProductCategories from '../Category/ProductCategories';
import Contact from '../Contact/Contact';

const Home = () => {

    const { user } = useContext(AuthContext);



    return (

        <div>
            <div className='text-lg text-center my-6'>
                {
                    user?.uid && <h1>
                        Hello "{user?.displayName ? user?.displayName : user?.email}" - Wellcome to Arrow Computer
                    </h1>
                }
            </div>
            <Carousel></Carousel>
            <ProductCategories></ProductCategories>
            <Advertised></Advertised>
            <Contact></Contact>
        </div>

    );
};

export default Home;