import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckOut from './CheckOut';

const stripePromise = loadStripe(process.env.REACT_APP_stripe_PK);

const Payment = () => {

    const product = useLoaderData();

    const { title, price } = product;

    console.log(product)

    return (
        <div>
            <h1 className='text-4xl'>Payment for {title}</h1>
            <p className='text-lg mt-2'>Please pay <strong>${price}</strong> for {title}</p>
            <div className='my-12 w-2/4'>
                <Elements stripe={stripePromise}>
                    <CheckOut product={product} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;