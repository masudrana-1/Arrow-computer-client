import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to='/' className="font-bold btn btn-ghost text-2xl">ARROW-COMPUTER</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/blogs'>Blogs</Link></li>
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    {

                        user?.uid ? <li><Link onClick={handleLogOut}>Log Out</Link></li>
                            :
                            <li><Link to='/login'>Log In</Link></li>

                    }
                </ul>
            </div>
        </div>
    );
};

export default Navbar;