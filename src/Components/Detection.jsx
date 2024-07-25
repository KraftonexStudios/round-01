import React, { useRef } from "react";
import "../CSS/Detection.css";
import { useLenis } from "lenis/react";
const Detection = () => {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  useLenis(({ velocity, direction }) => {
    if (videoRef1.current) {
      videoRef1.current.style.transform = `skewY(${-velocity * 0.4}deg)`;
      videoRef2.current.style.transform = `skewY(${-velocity * 0.4}deg)`;
    }
  });
  return (
    <div className="Detection-con">
      <div className="Detection-video1">
        <video
          ref={videoRef1}
          muted
          loop
          autoPlay
        >
          <source src="../../Video/Lights.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="Detection-video2">
        <video
          ref={videoRef2}
          muted
          loop
          autoPlay
        >
          <source src="../../Video/Exterior.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <h1 >PEERLESS REFINEMENT AND LUXURY</h1>
    </div>
  );
};

export default Detection;
