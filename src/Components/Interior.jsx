import React, { useRef } from "react";
import "../CSS/Interior.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Interior = () => {
  const inttl = useRef();
  const videoRef = useRef();
  const OverLayScrollRef = useRef();

  useGSAP(() => {
    inttl.current = gsap
      .timeline({
        scrollTrigger: {
          trigger: OverLayScrollRef.current,
          start: "-20% top",
          // markers: true,
        },
      })
      .from(".comfort", {
        opacity: 0,
        duration: 0.2,
      })
      .to(videoRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 2,
        ease: "power4.out",
      })
      .from(".interior-content", {
        opacity: 0,
        duration: 0.2,
      });
  });

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load(); // This will reload the video and show the poster again
    }
  };

  return (
    <>
      <div className="interior-container" ref={OverLayScrollRef}>
        <div className="interior-video">
          <video
            ref={videoRef}
            muted
            loop
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            poster="../../Images/poster.png"
            autoPlay={window.innerWidth < 1024 ? true : false}
          >
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
        <h1 className="comfort pointer-events-none">COMFORT</h1>
      </div>
    </>
  );
};

export default Interior;
