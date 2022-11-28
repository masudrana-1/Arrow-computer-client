import React from 'react';
import toast from 'react-hot-toast';

const Product = ({ product, setSelectedProduct }) => {

    const { title, img, location, original_price, product_type, resale_price, seller_name, post_time, years_of_use, details } = product;


    const handleWishList = () => {
        const addToWishlist = {
            title: title,
            price: resale_price,
            img: img,
            product_type: product_type
        }

        fetch('http://localhost:5000/wishlist', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addToWishlist)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.acknowledged) {
                    toast.success('Added to Wishlist successfully');

                }
            })
    }






    return (
        <div className="card card-side bg-base-100 h-[500px] shadow-xl my-5 ">
            {/* <figure><img src={img} alt="Movie" /></figure> */}
            <img className='w-[500px] rounded-xl' src={img} alt="" />
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
                    <button onClick={handleWishList} className='btn btn-primary'>Add to wishlist</button>
                    <label htmlFor="buyModal" className="btn"
                        onClick={() => setSelectedProduct(product)}
                    >
                        Buy Now
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Product;