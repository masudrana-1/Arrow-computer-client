import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast('Log Out', {
                    icon: '🥺',
                });
            })
            .catch(error => console.error(error))
    }

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/blogs'>Blogs</Link></li>
                            <li><Link to='/dashboard'>Dashboard</Link></li>
                            {
                                user?.uid ? <li><Link className='' onClick={handleLogOut}>Log Out</Link></li>
                                    :
                                    <li><Link className='' to='/login'>Log In</Link></li>
                            }
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">ARROW-COMPUTER</a>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/blogs'>Blogs</Link></li>
                        <li><Link to='/dashboard'>Dashboard</Link></li>
                        {
                            user?.uid ? <li><Link className='btn btn-ghost' onClick={handleLogOut}>Log Out</Link></li>
                                :
                                <li><Link className='btn btn-ghost' to='/login'>Log In</Link></li>
                        }
                    </ul>
                </div>
            </div>
            <label htmlFor="dashboard-drawer" className="btn absolute top-3 right-4 lg:hidden md:hidden btn-primary drawer-button"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg></label>
        </div>
    );
};

export default Navbar;