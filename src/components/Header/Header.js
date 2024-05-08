import React from 'react'
import './Header.css';
// import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order your favourite food here</h2>
            <p>Indulge in a culinary journey with our diverse menu, offering a delightful selection of dishes to satisfy every craving. From savory classics to exotic delights, we have something for everyone.</p>
           <a href='#explore-menu'><button>View Menu</button></a> 
        </div>

    </div>
  )
}

export default Header