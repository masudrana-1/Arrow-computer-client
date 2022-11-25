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

                    {/* <label htmlFor="dashboard-drawer" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}

                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li><Link className='text-lg' to='/dashboard'>Buyer</Link></li>
                        <li><Link className='text-lg' to='/dashboard/seller'>Seller</Link></li>
                        <li><Link className='text-lg' to='/dashboard/admin'>Admin</Link></li>
                        {/* {
                            isAdmin && <>
                                <li><Link to='/dashboard/allusers'>All Users</Link></li>
                                <li><Link to='/dashboard/adddoctor'>Add A Doctor</Link></li>
                                <li><Link to='/dashboard/managedoctors'>Manage Doctors</Link></li>
                            </>
                        } */}
                    </ul>

                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;