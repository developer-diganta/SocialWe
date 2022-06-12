import React, { useState } from 'react';
import './Header.css';

function Header() {
    const[imag, setImah] = useState("https://img.freepik.com/free-vector/vector-photographer-character-camera-professional-operator-correspondent-man-illustration_1284-42379.jpg?size=338&ext=jpg");
  return (
      <div className="header bg-white py-2 shadow-sm flex justify-between px-4">
          <div className='left flex justify-end'>
            <h2 className='site_name text-4xl relative md:text-2xl'>Socialwe</h2>
          </div>
          <div className='flex justify-center items-center gap-4 right-0 relative'>
              {/* home */}
              <a href='/'>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </a>
              {/* notification */}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {/* profile   */}
              <a href="/profile">
                <div className='rounded-full shadow-lg' style={{display: imag===null ? "none" : "block"}}>
                  <img className="w-8 h-8 rounded-full p-1" src={imag} alt="" />
                </div>
              </a>
          </div>
      </div>
  )
}

export default Header