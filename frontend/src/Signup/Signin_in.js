import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import "./Signup.css";

function Signin_in() {
  const[userName, setUserName] = useState();
  const[password, setPassword] = useState();
  const navigate = useNavigate();
  async function getSignInData(event){
    event.preventDefault();
    const sign_in_res = await axios.post('http://localhost:5000/login', {userId: userName, password});
    console.log(sign_in_res);
    if(sign_in_res.data.userId != null){
      localStorage.setItem("user", JSON.stringify({id: sign_in_res.data.userId, token: sign_in_res.data.token}))
      navigate('/home');
    }
  }

  return (
    <div>
      <Header />
      <div className="signup flex md:flex-col">
          <div className='w-1/2 flex justify-end h-full md:hidden' style={{minHeight: "100vh", maxHeight: "100vh"}}>
            <img className='w-2/3 h-2/3 my-auto' src="connection.jpg" alt="" />
          </div>
          <div className='w-1/2 justify-end h-full hidden md:block mx-auto'>
            <img className='h-2/3 w-2/3 mx-auto my-auto' src="connection.jpg" alt="" />
          </div>
          <div className="form w-1/2 flex justify-start align-middle md:w-full md:justify-center">
              <div className='flex flex-col justify-center w-2/4 lg:w-3/4'>
                <h1 className='text-4xl py-4'>Sign In</h1>
                <form action="" className='flex flex-col' onSubmit={getSignInData}>
                    {/* <input className='inpt py-2 my-4 rounded-sm px-4' type="text" placeholder='name' /> */}
                    <input className='inpt py-2 my-4 rounded-sm px-4' type="text" placeholder='@username' onChange={(ele) => setUserName(ele.target.value)} />
                    {/* <input className='inpt py-2 my-4 rounded-sm px-4' type="email" placeholder='email' /> */}
                    <input className='inpt py-2 my-4 rounded-sm px-4' type="text" placeholder='password' onChange={(ele) => setPassword(ele.target.value)} />
                    <button className='w-20 mx-auto py-2 px-4 rounded-sm text-white' style={{backgroundColor: "#1b2e35", border: "none"}} type='submit'>Submit</button>
                </form>
                <div className='mx-auto my-4' style={{backgroundColor: "#e4e4e4", minHeight: "1px", minWidth: "180px", maxWidth: "200px"}}>

                </div>
                <h4>Don't have an account? <a href='/signup' style={{color: "#59e4a8", fontWeight: "bold"}}>Sign Up</a></h4>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Signin_in