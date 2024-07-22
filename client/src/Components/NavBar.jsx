import React from 'react';
import VideoIcon from '../Media/video-camera-icon.png'
import  {NavLink}  from 'react-router-dom';


function NavBar() {
  return (
    <nav className='navbar shadow-xl w-screen '>
      <ul className='flex '>
        <li className='ml-6 text-3xl font-bold flex items-center'>Streameon <img src={VideoIcon} alt="video-icon" className='w-7 h-7  ml-2  mt-2'></img></li>
        <NavLink to='/Login'><button className="try-button p-2 m-5 shadow-xl  rounded-lg text-xl transform transition-transform hover:scale-110 hover:shadow-slate-600">
  Try Streameon
</button>
</NavLink>
      </ul>
    </nav>
  );
}

export default NavBar;
