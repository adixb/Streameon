import React from 'react';
import NavBar from '../Components/NavBar';
import Background from '../Media/LandingImage.png';
import VideoLand from '../Media/videoland.mp4';


function LandingPage() {
  return (
    <div className='Container w-screen h-screen'>
<NavBar/>
      <img src={Background} alt='background-image' className='absolute inset-0 w-full h-full object-cover ' />
      <div className='LandingBody flex items-center justify-center h-screen '>
  <div className='Body-text  w-1/2 p-4 text-left text-9xl text-white font-bold mt-36'>
 <p className='ml-7'>Unleash the<br></br> Power of<br></br> Real-Time Video Connections.</p>
  </div>
  <div className='Body-video w-1/2 p-4 text-center mr-24  h-5/6 mt-36'>
    <video src={VideoLand} autoPlay loop muted  className='w-full h-full object-cover rounded-full shadow-xl'></video>
  </div>
  
</div>

    </div>
  );
}

export default LandingPage;
