import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckOut = ({ product }) => {



    const { price, email, name, _id } = product;

    console.log(price, product);

    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');



    const stripe = useStripe();
    const elements = useElements();

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            // console.log(error);
            setCardError(error.message);
        }
        else {
            setCardError('');
        }

        setSuccess('');

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email

                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }

        if (paymentIntent.status === "succeeded") {

            // console.log('card-info', card);
            // store payment info in the database 

            const payment = {
                price,
                transactionId: paymentIntent.id,
                email,
                product_id: _id
            }

            fetch('http://localhost:5000/payments', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.insertedId) {
                        setSuccess('Congrats, Your payment completed');
                        setTransactionId(paymentIntent.id);
                    }
                })
        }
        setProcessing(false);


    }




    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className='btn btn-secondary btn-sm mt-4'
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className='text-red-500'>{cardError}</p>
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p>Your transactionId : <strong>{transactionId}</strong></p>
                </div>
            }
        </>
    );
};

export default CheckOut;