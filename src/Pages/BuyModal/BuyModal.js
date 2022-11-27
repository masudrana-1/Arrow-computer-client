import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const BuyModal = ({ user, product, loading, setSelectedProduct }) => {


    const { register, formState: { errors }, handleSubmit } = useForm();


    const handleBuy = (data) => {
        const addToCart = {
            name: data.name,
            email: user.email,
            phone: data.phone,
            date: data.date,
            title: product.title,
            price: product.resale_price,
            img: product?.img
        }

        fetch('http://localhost:5000/productCart', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addToCart)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.acknowledged) {
                    setSelectedProduct(null);
                    toast.success('Booking Confirm, please go to order page and payment for this product');
                    // refetch();
                }
                else {
                    // toast.error(data.message);
                }
            })
    }


    return (
        <div>
            {/* The button to open modal */}
            {/* <label htmlFor="buyModal" className="btn">open modal</label> */}

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="buyModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="buyModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className=' p-7 m-auto'>
                        <h1 className='text-4xl text-center'>Buy this product</h1>
                        <form onSubmit={handleSubmit(handleBuy)}>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name")} className="input input-bordered w-full" defaultValue={user?.displayName} placeholder='your name' />

                                {/* error message  */}
                                {errors.name && <p className='text-red-500'>{errors.name?.message}</p>}
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" {...register("email")} className="input input-bordered w-full" defaultValue={user?.email} />

                                {/* error message  */}
                                {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Phone</span>
                                </label>
                                <input type="number" {...register("phone", { required: "phone number is required" })} className="input input-bordered w-full" />

                                {/* error message  */}
                                {errors.phone && <p className='text-red-500'>{errors.phone?.message}</p>}
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Meeting Date</span>
                                </label>
                                <input type="date" {...register("date", { required: "date is required" })} className="input input-bordered w-full" defaultValue={user?.email} />

                                {/* error message  */}
                                {errors.date && <p className='text-red-500'>{errors.date?.message}</p>}
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type="text" {...register("title")} className="input input-bordered w-full" defaultValue={product?.title} />

                                {/* error message  */}
                                {errors.title && <p className='text-red-500'>{errors.title?.message}</p>}
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input type="number" {...register("price")} className="input input-bordered w-full" defaultValue={product?.resale_price} />

                                {/* error message  */}
                                {errors.price && <p className='text-red-500'>{errors.price?.message}</p>}
                            </div>
                            <input className='btn btn-primary w-full mt-4' value="buy" type="submit" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyModal;