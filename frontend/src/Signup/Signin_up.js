import React, { useState } from 'react';
import "./Signup.css";
import axios from 'axios';
import Header from '../Header/Header';

function Signin_up() {
  const[email, setEmail] = useState();
  const[userName, setUserName] = useState();
  const[phone, setPhone] = useState();
  const[password, setPassword] = useState();

  async function getValues(event){
    event.preventDefault();
    console.log(email, userName, phone, password);
    const response = await axios.post('http://localhost:5000/signup', {
      username: userName,
      password: password,
      email: email,
      phone_number: phone
    })
    console.log(response);
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
                <h1 className='text-4xl py-4'>Sign Up</h1>
                <form action="" className='flex flex-col' onSubmit={getValues}>
                    <input className='inpt py-2 my-4 rounded-sm px-4' type="email" placeholder='email' onChange={(e) => {setEmail(e.target.value)}} />
                    <input className='inpt py-2 my-4 rounded-sm px-4' type="text" placeholder='@username' onChange={(e) => {setUserName(e.target.value)}} />
                    <input className='inpt py-2 my-4 rounded-sm px-4' type="text" placeholder='phone' onChange={(e) => {setPhone(e.target.value)}} />
                    <input className='inpt py-2 my-4 rounded-sm px-4' type="text" placeholder='password' onChange={(e) => {setPassword(e.target.value)}} />
                    <button className='w-20 mx-auto py-2 px-4 rounded-sm text-white' style={{backgroundColor: "#1b2e35", border: "none"}} type='submit'>Submit</button>
                </form>
                <div className='mx-auto my-4' style={{backgroundColor: "#e4e4e4", minHeight: "1px", minWidth: "180px", maxWidth: "200px"}}>

                </div>
                <h4>Already have an account? <a href='/signin' style={{color: "#2ECC88", fontWeight: "bold"}}>Sign in</a></h4>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Signin_up