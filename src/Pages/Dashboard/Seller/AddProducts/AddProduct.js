import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthProvider';
import Loader from '../../../../Shared/Loader/Loader';

const AddProduct = () => {

    const { user } = useContext(AuthContext);

    const { register, formState: { errors }, handleSubmit } = useForm();

    // const imgHostingKey = process.env.REACT_APP_img_hosting_key;
    const imgHostingKey = "24bc95d0ef3bcdb20b0506314b5bbc84";

    // console.log(imgHostingKey);

    // navigate to 
    const navigate = useNavigate();

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/categories');
            const data = await res.json();
            return data;
        }
    })

    // getting current time  
    const current = new Date();

    const time = current.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

    // console.log(time);

    const handleAddProduct = data => {
        // console.log(data.image[0]);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    // console.log(imgData.data.url);
                    const product = {
                        seller_name: data.name,
                        email: user?.email,
                        title: data.title,
                        img: imgData.data.url,
                        location: data.location,
                        original_price: data.OriginalPrice,
                        resale_price: data.ResalePrice,
                        product_type: data.category,
                        details: data.details,
                        post_time: time


                    }



                    // console.log(product)

                    // save product info to database 
                    fetch('http://localhost:5000/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            // authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.title} is added successfully`);
                            navigate('/dashboard/seller/products');
                        })

                }
            })

    }

    if (isLoading) {
        return <Loader></Loader>
    }


    return (
        <div className='w-2/4 p-7 m-auto'>
            <h1 className='text-4xl'>Add A Product</h1>
            <form onSubmit={handleSubmit(handleAddProduct)}>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" {...register("name", { required: "Name is required" })} className="input input-bordered w-full" defaultValue={user?.displayName} placeholder='your name' />

                    {/* error message  */}
                    {errors.name && <p className='text-red-500'>{errors.name?.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input type="text" {...register("title", { required: "title is required" })} className="input input-bordered w-full" />

                    {/* error message  */}
                    {errors.title && <p className='text-red-500'>{errors.title?.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Location</span>
                    </label>
                    <input type="text" {...register("location", { required: "location is required" })} className="input input-bordered w-full" />

                    {/* error message  */}
                    {errors.location && <p className='text-red-500'>{errors.location?.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Original Price</span>
                    </label>
                    <input type="number" {...register("OriginalPrice", { required: "OriginalPrice is required" })} className="input input-bordered w-full" />

                    {/* error message  */}
                    {errors.OriginalPrice && <p className='text-red-500'>{errors.OriginalPrice?.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Resell Price</span>
                    </label>
                    <input type="number" {...register("ResalePrice", { required: "ResalePrice is required" })} className="input input-bordered w-full" />

                    {/* error message  */}
                    {errors.ResalePrice && <p className='text-red-500'>{errors.ResalePrice?.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Use of year</span>
                    </label>
                    <input type="number" {...register("year", { required: "year is required" })} className="input input-bordered w-full" />

                    {/* error message  */}
                    {errors.year && <p className='text-red-500'>{errors.year?.message}</p>}
                </div>

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Category</span>
                    </label>
                    <select {...register("category", { required: "category is required" })}
                        className="select select-bordered w-full ">
                        <option disabled>Please select a category</option>
                        {
                            categories?.map(category => <option
                                key={category?._id}
                                value={category?.product_type}
                            >
                                {category?.product_type}
                            </option>)
                        }
                    </select>
                </div>

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="file" {...register("image", { required: "image is required" })} className="input w-full" />

                    {/* error message  */}
                    {errors.image && <p className='text-red-500'>{errors.image?.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Details</span>
                    </label>
                    <input type="text" {...register("details", { required: "details is required" })} className="textarea textarea-bordered w-full" />

                    {/* error message  */}
                    {errors.details && <p className='text-red-500'>{errors.details?.message}</p>}
                </div>
                <input className='btn btn-primary w-full mt-4' value="Add a product" type="submit" />
            </form>
        </div>
    );
};

export default AddProduct;