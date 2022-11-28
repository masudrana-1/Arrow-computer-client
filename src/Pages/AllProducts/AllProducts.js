import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Loader from '../../Shared/Loader/Loader';
import BuyModal from '../BuyModal/BuyModal';
import Product from '../Product/Product';

const AllProducts = () => {

    const { user, loading } = useContext(AuthContext);

    const [seletedProduct, setSelectedProduct] = useState(null);


    const products = useLoaderData();
    // console.log(products);

    // const { title, img, product_type } = products;

    if (loading) {
        return <Loader></Loader>
    }

    return (
        <div className=''>
            <div className='w-5/6 m-auto'>
                {
                    products.map(product => <Product key={product._id}
                        setSelectedProduct={setSelectedProduct}
                        product={product}
                    ></Product>)
                }
            </div>

            {
                <BuyModal
                    user={user}
                    product={seletedProduct}
                    setSelectedProduct={setSelectedProduct}
                    loading={loading}
                >

                </BuyModal>
            }

        </div>
    );
};

export default AllProducts;