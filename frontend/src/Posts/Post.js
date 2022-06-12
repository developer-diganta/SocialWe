import React, { useState } from 'react';
import './Post.css';

function Post({info}) {
    const[post, setPost] = useState()

  return (
      <div className="indi_post mb-10" style={{border: "1px solid#EBEEEA", backgroundColor: "#FFF"}}>
          <p className='post_text px-4 py-4 text-lg' style={{color: "#6C6D6B"}}>{info.text}</p>
          <div style={{borderTop: "1px solid #EBEEEA", borderBottom: "1px solid #EBEEEA"}}>
            <img className='mx-auto' style={{width: "300px", height: "300px"}} src={info.imag} alt="" />
          </div>
          <div className='flex items-center justify-between px-8'>
            <div style={{color: "#6C6D6B"}}>
              <p>{info.date}</p>
            </div>
            <div className="likes py-3 pl-4 flex items-center">
                <div className='love w-11 h-11 mx-4 flex justify-center items-center' style={{borderRadius: "50%", border: "2px solid #DCDDDB"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                  </svg>
                </div>
                <p style={{color: "#6C6D6B"}}>{info.react} likes</p>
            </div>
          </div>
      </div>
  )
}

export default Post