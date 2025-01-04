import React from 'react';
import './Footer.css';
import logo1 from '../Assets/logo1.png';
import { BsPiggyBank } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { CiWallet } from "react-icons/ci";

function Footer() {
  return (
   <>
   <div className='footer'>
   <div className='container'>
   <div className='left-box'>
    <div className='box'>
        <div className='icon-box'>
        <BsPiggyBank />
        </div>
     <div className='details'>
        <h3>Greate Saving</h3>
        <p>you have a greate Saving
        </p>

     </div>
    </div>
    <div className='box'>
        <div className='icon-box'>
        <FaShippingFast />
        </div>
     <div className='details'>
        <h3>Free Delivery</h3>
        <p>you have a greate Saving
        </p>

     </div>
    </div>
    <div className='box'>
        <div className='icon-box'>
        <TfiHeadphoneAlt />
        </div>
     <div className='details'>
        <h3>24x7 support</h3>
        <p>you have a greate Saving
        </p>

     </div>
    </div>
    <div className='box'>
        <div className='icon-box'>
        <CiWallet />
        </div>
     <div className='details'>
        <h3>Money back</h3>
        <p>you have a greate Saving
        </p>

     </div>
    </div>

   </div>
<div className='right-box'>
    <div className='header'>
        <img src={logo1} alt='image'></img>
        <p>Include popular icons in your React projects easily with react-icons, which utilizes ES6 imports that allows you to include only the icons that your project is using.
        </p>
    </div>
    <div className='bottom'>
    <div className='box'>
        <h3>Your Account</h3>
        <ul>
            <li>About it</li>
            <li>Account</li>
            <li>Payment</li>
            <li>Sales</li>
        </ul>

    </div>
    <div className='box'>
        <h3>Products</h3>
        <ul>
            <li>Delivery</li>
            <li>Track Order</li>
            <li>New Product</li>
            <li>Old Payment</li>
        </ul>

    </div>
    <div className='box'>
        <h3>Contact us</h3>
        <ul>
            <li>1/206, madurai, tamil nadu.</li>
            <li>+(91) 9635821475</li>
            <li>applestore@gmail.com</li>
        </ul>

    </div>
    </div>
</div>
   </div>
   
   </div>
   </>
  )
}

export default Footer;