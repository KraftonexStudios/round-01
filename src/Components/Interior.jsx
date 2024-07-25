import React from "react";
import "../CSS/Interior.css";

const Interior = () => {
  return (
    <>
      <div className="interior-container">
        <div className="interior-video">
          <video muted loop autoPlay>
            <source src="../../Video/Interior.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="interior-content">
          <h1>Experience the Luxury</h1>
          <p>
            Discover the refined elegance and advanced features of the Range
            Rover interior.
          </p>
        </div>
        <h1 className="comfort">COMFORT</h1>
      </div>
    </>
  );
};

export default Interior;
