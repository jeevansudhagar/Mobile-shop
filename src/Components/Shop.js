import React, { useState } from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
import Homeproduct from './Home-product';
import { FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import testimonial from '../Assets/testimonial.jpeg';

function Shop() {
  const [trendingProduct, setTrendingProduct] = useState(Homeproduct)
  const filtercate = (x) =>
  {
    const filterproduct = Homeproduct.filter((curElm) =>
    {
      return curElm.type === x
    })
    setTrendingProduct(filterproduct)
  }
  const allTrendingProduct = () =>
  {
    setTrendingProduct(Homeproduct)
  }
  return (
    // <>
    // <div className='shop'>
    //   <h2># shop</h2>
    //   <p>Home - shop</p>
    //   <div className='container'>
    //     <div className='left-box'>
    //       <div className='category'>
    //         <div className='header'>
    //           <h3>all categories</h3>

    //         </div>
    //         <div className='box'>
    //          <ul>
    //           <li># airpod</li>
    //           <li># iphone</li>
    //           <li># imac</li>
    //           <li># homepod</li>
    //           <li># tv</li>
    //           <li># macbook</li>
    //           <li># iphone</li>
    //           <li># charger</li>
    //          </ul>
    //         </div>
    //       </div>
    //       <div className='banner'>
    //         <div className='img-box'>
    //           <img src='' alt='
    //           '></img>

    //         </div>

    //       </div>
    //       <div className='product-box'>
    //         <div className='product-container'>
             
    //          <div className='box'></div>
    //         </div>

    //       </div>
    //     </div>

    //   </div>

    // </div>
    // </>

    <>
   <div className='home'>
    {/* <div className='top-banner'>
        <div className='contant'>
            <h3>Your new iPhone 14.<br/></h3>
            <h2>Just the way you <br/>want it...</h2>
            <p>30% off at your first order</p>
            <Link to='/Shop' className='link'>Shop Now</Link>

        </div>
    </div> */}
<div className='trending'>
  <div className='container'>
    <div className='left-box'>
      <div className='header'>
        <div className='heading'>
          <h2 onClick={() => allTrendingProduct ()}>trending product</h2>

        </div>
        <div className='cate'>
          <h3 onClick={() => filtercate('new')}>NEW</h3>
          <h3 onClick={() => filtercate('featured')}>Featured</h3>
          <h3 onClick={() => filtercate('top')}>top selling</h3>

        </div>

      </div>
      <div className='products'>
        <div className='container'>
          {
            trendingProduct.map((curElm) =>
            {
              return(
                <>
                 <div className='box'>
                  <div className='img-box'>
                   <img src={curElm.Image} alt='images'></img>
                   <div className='icon'>
                    <div className='icon-box'>
                    <FaEye />
                    </div>
                    <div className='icon-box'>
                    <FaHeart />
                    </div>
                   </div>
                  </div>
                  <div className='info'>
                   <h3>{curElm.Name}</h3>
                   <p>${curElm.price}</p>
                   <button className='btn'>Add to cart</button>
                  </div>
                 </div>
                </>
              )
            })
          }

        </div>
        {/* <button>Show More</button> */}
      </div>

    </div>
<div className='right-box'>
<div className='right-container'>
  <div className='testimonial'>
    <div className='head'>
    <h3>our testimonial</h3>
    </div>
    <div className='details'>
      <div className='img-box'>
        <img className='img-test' src={testimonial} alt='testimonial'></img>

      </div>
      <div className='info'>
        <h3>Jeevan sudhagar</h3>
        <h4>web designer</h4>
        <p>hey... all this jeeva from madurai..</p>

      </div>
    </div>
  </div>
  <div className='newsletter'>
    <div className='head'>
      <h3>newsletter</h3>

    </div>
    <div className='form'>
  <p>Join our mailing list</p>
  <input type='email' placeholder='E-mail' autoComplete='off' />
  <button>Subscribe</button>
  
  <div className='icon-box'>
    <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer' className='icon'>
      <FaFacebookF />
    </a>
    <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer' className='icon'>
      <FaTwitter />
    </a>
    <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer' className='icon'>
      <FaInstagram />
    </a>
    <a href='https://www.youtube.com' target='_blank' rel='noopener noreferrer' className='icon'>
      <FaYoutube />
    </a>
  </div>
</div>


  </div>
</div>

</div>
  </div>

</div>
{/* <div className='banners'>
  <div className='container'>
    <div className='left-box'>
      <div className='box'>
        <img src={banners3} alt='banner'></img>
      </div>
      <div className='box'>
        <img src={banners2} alt='banner'></img>
      </div>

    </div>
<div className='right-box'>
  <div className='top'>
  <img src={banners1} alt='banner'></img>
  <img src={banners4} alt='banner'></img> //1.35
  </div>

</div>
  </div>

</div> */}
   </div>
   </>
  )
}

export default Shop
            
