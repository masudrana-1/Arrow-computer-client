import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';

const DashboardLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* <!-- Page content here --> */}

                    <Outlet></Outlet>


                </div>
                <div className="drawer-side ">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content bg-white text-center">
                        {/* <!-- Sidebar content here --> */}
                        <li><Link className='text-lg text-center bg-orange-500 shadow-lg shadow-red-500/100 mb-3' to='/dashboard/buyer'>Buyer</Link></li>
                        <li><Link className='text-lg bg-orange-500 text-center mb-3 shadow-lg shadow-red-500/100' to='/dashboard/seller'>Seller</Link></li>
                        <li><Link className='text-lg bg-orange-500  text-center mb-2 shadow-lg shadow-red-500/100' to='/dashboard/admin'>Admin</Link></li>
                    </ul>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;