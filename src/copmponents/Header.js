import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link className='navbar-brand' to='/'>
          Samer Store
        </Link>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <Link to='/' className='nav-link'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/products' className='nav-link'>
                Products
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/contact' className='nav-link'>
                Contact US
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
