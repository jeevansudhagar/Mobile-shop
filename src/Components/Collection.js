import React from 'react';
import '../Components/Collection.css';
import { Link } from 'react-router-dom';

function Collection() {
  return (
    <>
    <div className='cart'>
    <h3>#cart</h3>
        <div className='container'>
           {
            Collection.length === 0 &&
            <>
            <div className='empty-cart'>
                <h2>Your Shopping cart is empty</h2>
                <Link to='/shop'> <button>Shopping Now</button></Link>
               
            </div>
            </>

           }

        </div>

    </div>
    </>
  )
}

export default Collection;