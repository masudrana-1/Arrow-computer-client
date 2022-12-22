import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
    return (
        <div className='shadow-md shadow-red-500/100'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-200 p-10 shadow-xl my-10'>
                <div className=''>
                    <h1 className='text-5xl  font-bold mb-3'>Ready to join.</h1>
                    <p>It is a big used computer market</p>
                </div>
                <div className='text-end'>
                    <Link className='btn btn-error w-2/5 mt-8 shadow-lg shadow-red-500/100' to='/signup'>SignUp</Link>
                </div>
            </div>
        </div>
    );
};

export default Contact;