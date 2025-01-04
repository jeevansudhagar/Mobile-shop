import React from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { IoSearch } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";
import { BiLogOut } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import {Link} from 'react-router-dom';
import './Nav.css';
import logo from '../Assets/logo.png';
import { useAuth0, User } from "@auth0/auth0-react";

function Nav() {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    const handleAuthAction = () => {
        if (isAuthenticated) {
            logout({ returnTo: window.location.origin });
        } else {
            loginWithRedirect();
        }
    };

    return (
        <div className="header">
            <div className="top-header">
                <div className="icon">
                    <MdLocalShipping />
                </div>
                <div className="info">
                    <p>Free Shipping When Shopping upto $1000</p>
                </div>
            </div>
            <div className="mid-header">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="search-box">
                    <input type="text" placeholder="search" />
                    <button><IoSearch /></button>
                </div>
                <div className="user">
                    <div className="icon">
                        {isAuthenticated ? <BiLogOut /> : <LuLogIn />}
                    </div>
                    <div className="btn">
                        <button onClick={handleAuthAction}>
                            {isAuthenticated ? 'Logout' : 'Login'}
                        </button>
                    </div>
                </div>
            </div>
            <div className='last-header'> 
                <div className='user-profile'>
                    {
                        isAuthenticated ?
                        <>
                        <div className='icon'>
                        <FaRegUser />
                        </div>
                        <div className='info'>
                        <h2>{User.name}</h2>
                        <p>{User.email}</p>
                        </div>
                        
                        </>
                        :
                        <>
                         <div className='icon'>
                        <FaRegUser />
                        </div>
                        <div className='info'>
                            <p>please login</p>

                        </div>
                        </>
                    }
                </div>
                <div className='nav'>
                <ul>
                    <li><Link to='/' className='link'>Home</Link></li>
                    <li><Link to='/Shop' className='link'>Shop</Link></li>
                    <li><Link to='/Collection' className='link'>Cart</Link></li>
                    {/* <li><Link to='/About' className='link'>About</Link></li> */}
                    <li><Link to='/Contact' className='link'>Contact</Link></li>
                </ul>
                </div>
                <div className='offer'>
                    <p>flat 10% over all iphone</p>

                </div>
            </div>
        </div>
    );
}

export default Nav;


