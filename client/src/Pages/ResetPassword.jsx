import React, { useState } from "react";
import Background from "../Media/LandingImage.png";
import icon from "../Media/video-camera-icon.png";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState('');
  const { id, token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting password reset request...");

    axios.post(`http://localhost:8000/api/ResetPassword/${id}/${token}`, { password })
      .then(res => {
        console.log('Response', res.data);
        navigate('/Login');
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <>
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
          <form className="w-full max-w-sm flex flex-col p-7" >

            {/* Password input */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Create a New  Password
                  </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline"
                placeholder="Create a  New Password"
                required
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              Set Password
                </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ResetPassword;