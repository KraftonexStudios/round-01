import React, { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../CSS/Horizontal.css";
gsap.registerPlugin(ScrollTrigger);
const Exterior = () => {
  const containerRef = useRef();
  const carImageRef = useRef();

  useGSAP(
    (context) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "-30% top",
        },
      });
      tl.from(".range-animate", {
        yPercent: -100,
      });
      tl.from(
        "#car-div",
        {
          yPercent: 100,
          ease: "power1.inOut", // Adjust easing function as needed
          duration: 1,
        },
        "<",
      );
      tl.from(".circle-exterior", {
        opacity: 0,
        scale: 0,
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="exterior-container relative">
      <div className="circle-exterior z-[-1]"></div>

      <div className="range1-text-container">
        <div className="rangetext overflow-hidden">
          <div className="range-animate flex">
            <h3>RANGE</h3>
          </div>
        </div>
        <div className="rovertext overflow-hidden">
          <h3>ROVER</h3>
        </div>
        <div id="car-div" className="object-contain" ref={carImageRef}>
          <picture>
            <source
              media="(min-width : 1024px)"
              srcSet="../../Images/range11.png"
              type="image/png"
            />
            <source
              media="(max-width : 1024px)"
              srcSet="../../Images/range1.png"
              type="image/png"
            />
            <img src="../../Images/range1.png" alt="RANGE ROVER IMAGE" />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default Exterior;
