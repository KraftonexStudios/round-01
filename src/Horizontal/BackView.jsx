import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const BackView = () => {
  const backview = useRef();
  const backtl = useRef();
  useGSAP(() => {
    backtl.current = gsap
      .timeline({
        scrollTrigger: {
          trigger: backview.current,
          start: () => (window.innerWidth < 600 ? "180% top" : "340% top"),
          end: () => (window.innerWidth < 600 ? "220% top" : "380% top"),
          scrub: true,
        },
      })
      .from(".new-text", {
        yPercent: -100,
        opacity: 0,
      })
      .from(".era-text", {
        yPercent: 100,
        opacity: 0,
      });
  });
  return (
    <div className="back-view-container" ref={backview}>
      <div className="back3-text-con">
        <div className="new-text">
          <h2>NEW</h2>
        </div>
        <div className="era-text">
          <h2>ERA</h2>
        </div>

        <div id="car-div3">
          <img className="" src="../../Images/range3.png" alt="RANGE ROVER" />
        </div>
      </div>
    </div>
  );
};

export default BackView;
