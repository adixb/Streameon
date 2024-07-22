import React from "react";
import VideoIcon from "../Media/video-camera-icon.png";
import { useNavigate, useLocation } from "react-router-dom";

function HomeNavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAction = () => {
    if (location.pathname === "/Home") {
      // If on the Home page, perform logout
      handleLogout();
    } else {
      // If in a room, leave the room and redirect to Home
      navigate('/Home');
     
    }
  };

  const handleLogout = () => {
    // Redirect to the home page upon logout
    navigate('/');
  };

  return (
    <nav className="navbar w-screen shadow-xl m-5 p-5 ml-0 flex justify-between items-center">
      <div className="text-3xl font-bold flex items-center">
        Streameon{" "}
        <img
          src={VideoIcon}
          alt="video-icon"
          className="w-7 h-7 ml-2 mt-2"
        />
      </div>
      <button
        className="p-2 m-5 shadow-xl rounded-lg text-xl transform transition-transform hover:scale-110 hover:shadow-slate-600"
        onClick={handleAction}
      >
        {location.pathname === "/Home" ? "Log Out" : "Leave Room"}
      </button>
    </nav>
  );
}

export default HomeNavBar;
