import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckOut from './CheckOut';

// const stripePromise = loadStripe(process.env.REACT_APP_stripe_PK);
const stripePromise = loadStripe("pk_test_51M7AIcJbEvprLQEgKRa0OWy3uEWnvWtehNV0Wpk2bB3ICHWuQjs3M9No3wkyBL5DB09gij8mTXA4ZL9yRNjGa5sq004txD9sFK");

const Payment = () => {

    const product = useLoaderData();

    const { title, price } = product;

    console.log(product)

    return (
        <div>
            <h1 className='text-4xl'>Payment for { }</h1>
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