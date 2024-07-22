import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';
import HomeNavbar from '../Components/HomeNavbar'
import Background from "../Media/LandingImage.png";

const socket = io.connect('http://localhost:8000');

function Home() {
  const [me, setMe] = useState(""); // State to store user ID
  const [stream, setStream] = useState(); // State to store user's media stream
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const connectionRef = useRef(null);

  useEffect(() => {
    // Initialize socket and set user ID on component mount
    socket.on("me", (id) => {
      console.log("Received user ID:", id);
      setMe(id); // Set user ID upon receiving it from the server
    });

    // Get user media stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      })
      .catch(error => console.error('Error accessing media devices:', error));

    // Socket event listeners
    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });

    // Cleanup function for useEffect
    return () => {
      socket.off("me");
      socket.off("callUser");
    };
  }, []); // Empty dependency array means this effect runs only once on mount

  const callUser = (id) => {
    if (id !== me) {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream,
      });
      peer.on("signal", (data) => {
        socket.emit("callUser", {
          userToCall: id,
          signalData: data,
          from: me,
          name: name,
        });
      });
      peer.on("stream", (stream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });
      socket.on("callAccepted", (signal) => {
        setCallAccepted(true);
        peer.signal(signal);
      });

      connectionRef.current = peer;
    } else {
      console.log("Cannot call yourself!");
    }
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload(); // Reload the page after ending the call
  };

  const toggleAudio = () => {
    setAudioEnabled(prevState => !prevState);
    stream.getAudioTracks().forEach(track => {
      track.enabled = !audioEnabled;
    });
  };

  const toggleVideo = () => {
    setVideoEnabled(prevState => !prevState);
    stream.getVideoTracks().forEach(track => {
      track.enabled = !videoEnabled;
    });
  };

  return (
    <div className="bg-cover bg-center h-screen relative">
      <HomeNavbar />
      <img
        src={Background}
        alt="background-image"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="container mx-auto flex justify-center items-center h-full z-10">
        <div className="video-container flex relative z-10">
          <div className="video">
            {stream && <video playsInline muted ref={myVideo} autoPlay className={`w-full h-full ${videoEnabled ? '' : 'hidden'}`} />}
          </div>
          <div className="video">
            {callAccepted && !callEnded ?
              <video playsInline ref={userVideo} autoPlay className={`w-full h-full ${videoEnabled ? '' : 'hidden'}`} /> :
              null}
          </div>
        </div>
        <div className="myId bg-white p-4 rounded-md shadow-lg z-10">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 p-2 rounded-md border border-gray-300 w-full"
          />
          <CopyToClipboard text={me}>
            <button className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Copy ID</button>
          </CopyToClipboard>
          <input
            type="text"
            placeholder="ID to call"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
            className="mb-4 p-2 rounded-md border border-gray-300 w-full"
          />
          <div className="call-button">
            {callAccepted && !callEnded ? (
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={leaveCall}>End Call</button>
            ) : (
              <>
                <button className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${idToCall === me ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => callUser(idToCall)} disabled={idToCall === me}>Call</button>
                {receivingCall && !callAccepted ? (
                  <div className="caller bg-white p-4 rounded-md shadow-lg">
                    <h1>{name} is calling...</h1>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={answerCall}>Answer</button>
                  </div>
                ) : null}
              </>
            )}
            <span className="ml-2">{me}</span>
          </div>
          {callAccepted && !callEnded && (
            <div className="audio-video-controls mt-4">
              <button className={`bg-transparent border-0 text-${audioEnabled ? 'green' : 'red'}-500 hover:text-${audioEnabled ? 'green' : 'red'}-700 font-bold py-2 px-4 rounded mr-2`} onClick={toggleAudio}>
                {audioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
              </button>
              <button className={`bg-transparent border-0 text-${videoEnabled ? 'green' : 'red'}-500 hover:text-${videoEnabled ? 'green' : 'red'}-700 font-bold py-2 px-4 rounded mr-2`} onClick={toggleVideo}>
                {videoEnabled ? <FaVideo /> : <FaVideoSlash />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;