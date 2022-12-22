import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider';

const Product = ({ product, setSelectedProduct, setOpenModal }) => {

    const { user } = useContext(AuthContext);

    const { title, _id, img, location, original_price, product_type, resale_price, seller_name, post_time, years_of_use, details } = product;


    const handleWishList = () => {
        const addToWishlist = {
            title: title,
            product_id: _id,
            price: resale_price,
            img: img,
            product_type: product_type,
            email: user?.email
        }

        fetch('https://arrow-computer-server.vercel.app/wishlist', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addToWishlist)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);

                if (data.acknowledged) {
                    toast.success('Added to Wishlist successfully');

                }
            })
    }



    const handleByModal = (product) => {
        setOpenModal(true);
        setSelectedProduct(product)
    }


    return (
        <div className="card card-side flex flex-col lg:flex-row md:flex-row bg-base-100 lg:h-[500px] shadow-lg shadow-red-500/50 my-5 ">
            {/* <figure><img src={img} alt="Movie" /></figure> */}
            <div>
                <img className='lg:w-[500px] w-full  h-full rounded-xl' src={img} alt="" />
            </div>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>Details: {details}</p>
                <p className='text-lg'>Location: {location}</p>
                <p className='text-lg'>Original Price: {original_price} TK.</p>
                <p className='text-lg'>Resale Price: {resale_price} TK.</p>
                <p className='text-lg'>Year of used: {years_of_use} year</p>
                <p className='text-lg'>Seller: {seller_name}</p>
                <p className='text-lg'>Time: {post_time}</p>
                <div className="card-actions justify-end">
                    <button onClick={handleWishList} className='btn btn-primary shadow-xl shadow-cyan-500/50'>Add to wishlist</button>
                    <label htmlFor="buyModal" className="btn shadow-xl shadow-red-500/50 "
                        onClick={() => handleByModal(product)}

                    >
                        Buy Now
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Product;