import React, { useState } from 'react'
import Background from "../Media/LandingImage.png";
import icon from "../Media/video-camera-icon.png";
import {Link} from 'react-router-dom' ;
import axios from 'axios' ; 
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email,setEmail] = useState('') ; 
  const navigate = useNavigate(); 

const handleSubmit=(e)=>{
e.preventDefault() ; 
axios.post('http://localhost:8000/api/ForgotPassword',{email})
.then(res=>{
  if(res.data.message==='Success'){
navigate('/Login');
  }
})
}

  return (
    <>
    <div className='forgotpassword-container'>
    <div className="Signup-Container w-screen h-screen">
        <img
          src={Background}
          alt="background-image"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="Signup-form w-96 h-auto shadow-2xl flex flex-col items-center">
          {/* Heading */}
          <div className="flex flex-col items-center m-7">
          <Link to='/'><img src={icon} alt="streameon-icon" className="w-7 h-7" /></Link>
            <p className="p-2 font-bold">Reset Password !</p>
          </div>
          
          {/* Form */}
          <form className="w-full max-w-sm flex flex-col p-7">
            {/* Email input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                placeholder="Enter your email"
                required
              />
            </div>

           <Link to='/Login'><p className='mb-7 font-bold'>Already have an account ? </p></Link> 

            
            {/* Submit button */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
       Send Reset Link 
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default ForgotPassword