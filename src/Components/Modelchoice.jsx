import React, { useContext, useEffect, useRef } from "react";
import "../CSS/Modelchoice.css";
import HoverEffect from "hover-effect";
import { refContext } from "../Context/RefContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Modelchoice = () => {
  const modelchoise = useRef();
  const { Choice1Ref, Choice2Ref } = useContext(refContext);
  useEffect(() => {
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      if (
        args[0] &&
        typeof args[0] === "string" &&
        args[0].includes("Hover effect by Robin Delaporte:")
      ) {
        return;
      }
      originalConsoleLog(...args);
    };
    const elements = modelchoise.current.querySelector(".hover2");
    new HoverEffect({
      parent: elements,
      intensity: 0.5,
      image1: "../../Images/Rangelight2.jpeg",
      image2: "../../Images/rann.webp",
      displacementImage: "../../Images/d1.jpeg",
      hover: true,
      angle: -Math.PI / 6,
      imagesRatio: 9 / 16,
    });
    const element1 = modelchoise.current.querySelector(".hover");
    new HoverEffect({
      parent: element1,
      intensity: 0.5,
      image1: "../../Images/1600.webp",
      image2: "../../Images/16001.webp",
      displacementImage: "../../Images/d3.jpeg",
      hover: true,
      angle: Math.PI / 4,
      imagesRatio: 9 / 16,
    });
  }, []);
  return (
    <div ref={modelchoise} className="Model-choice-Main relative z-[10]">
      <div ref={Choice1Ref} className="Details">
        <div className="Details-Desc">
          <div className="hover relative h-[100vh] overflow-hidden object-contain"></div>
        </div>
      </div>
      <div className="features">
        <h1>The true definition of luxury</h1>
      </div>
      <div ref={Choice2Ref} className="Details">
        <div className="Details-Desc">
          <div className="hover2 relative h-[100vh] overflow-hidden"></div>
        </div>
      </div>
    </div>
  );
};

export default Modelchoice;
