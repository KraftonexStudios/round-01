import React, { useRef, useContext, useState, useEffect } from "react";
import "../CSS/Hero.css";
import { Canvas } from "@react-three/fiber";
import { Model } from "../Canvas/RangeRoverModel";
import { Plane } from "@react-three/drei";
import Lights from "../Canvas/Lights";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { refContext } from "../Context/RefContext";
import { NavLink } from "react-router-dom";
import BuildEnvro from "./BuildEnvro";
import CircleSvg from "../assets/Circ.svg";
import SplitType from "split-type";
import Process from "./Process";

const ModelComponent = () => {
  return (
    <>
      <Model />
      <Lights />
      <BuildEnvro />
      <Plane
        args={[40, 40]}
        position={[0, -0.7, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial roughness={1} metalness={0.5} color="black" />
      </Plane>
    </>
  );
};
const HeroHtml = () => {
  const buildRef = useRef();
  const redRef = useRef();
  const htmltl = useRef();
  const htmltl2 = useRef();
  useGSAP(() => {
    const tween = gsap.from(".hero-char", {
      repeat: 10,
      ease: "none",
      yPercent: (x) => (x % 2 === 0 ? -100 : 100),
    });
    gsap.to(tween, {
      totalProgress: 1,
      duration: 2,
      ease: "power4.out",
    });
    const RangeText = new SplitType(buildRef.current, { types: "chars" });
    const RedefineText = new SplitType(redRef.current, { types: "words" });
    htmltl.current = gsap
      .timeline({
        ease: "none",
        repeat: -1,
      })
      .from(RangeText.chars, {
        // ease: "power4.in",
        color: "black",
        stagger: 0.05,
        duration: 4,
      })
      .from(
        RangeText.chars,
        {
          ease: "power4.out",
          color: "black",
          stagger: 0.05,
          duration: 0.1,
        },
        "-=20%",
      );

    htmltl2.current = gsap
      .timeline({
        ease: "none",
      })
      .to(".hero-offset", {
        yPercent: -100,
        duration: 1.5,
      })
      .from(".hero-rover", {
        xPercent: -100,
        ease: "power4.out",
        opacity: 0,
      })
      .from(RedefineText.words, {
        xPercent: (x) => (x % 2 === 0 ? 100 : -100),
        duration: 1,
        stagger: 0.1,
        opacity: 0,
      })
      .from(
        ".h5-hero",
        {
          // ease: "power4.in",
          duration: 0.5,
          opacity: 0,
        },
        "-=20%",
      )
      .from(
        buildRef.current,
        {
          opacity: 0,
        },
        "-=100%",
      );
  });
  return (
    <>
      <div className="hero-offset absolute top-0 z-[10000] h-[100vh] w-[100vw] bg-black"></div>
      <div className="Hero-top">
        <div className="Hero-right-con">
          <h3 ref={redRef}>
            Redefining <br /> Elegance
            <span className="ml-3 text-[#f3dfc8]"> and </span> <br /> Capability
          </h3>
          <h5 className="h5-hero">
            Luxury redefined, innovation uncompromised.
          </h5>
        </div>

        <div className="pointer-events-auto">
          <NavLink to="/build">
            <h4 ref={buildRef} className="hero-button">
              BUILD YOUR OWN
            </h4>
          </NavLink>
        </div>
      </div>
      <div className="hero-html-con">
        <div className="containerrr">
          <div className="Hero-main-text">
            <div className="main-overflow z-10 flex leading-none">
              <div className="hero-char leading-none">
                <h1>R</h1>
                <h1>R</h1>
              </div>
              <div className="hero-char leading-none">
                <h1>A</h1>
                <h1>A</h1>
              </div>
              <div className="hero-char leading-none">
                <h1>N</h1>
                <h1>N</h1>
              </div>
              <div className="hero-char leading-none">
                <h1>G</h1>
                <h1>G</h1>
              </div>
              <div className="hero-char leading-none">
                <h1>E</h1>
                <h1>E</h1>
              </div>
            </div>
            <div className="hero-rover relative z-0 whitespace-nowrap">
              ROVER
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Hero = () => {
  gsap.registerPlugin(ScrollTrigger);
  const CanvasRef = useRef();
  const pointerCircleRef = useRef();
  const { HeroRef } = useContext(refContext);
  const isHighEndDevice = navigator.deviceMemory && navigator.deviceMemory > 4;
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(
    (context, contextSafe) => {
      ScrollTrigger.create({
        trigger: CanvasRef.current,
        start: "top top",
        end: () => window.innerHeight * 13,
        pin: CanvasRef.current,
        invalidateOnRefresh: true,
        pinType: "fixed",
        pinnedContainer: CanvasRef.current,
        anticipatePin: 1,
      });
    },
    { scope: CanvasRef },
  );
  useGSAP(() => {
    let xTo = gsap.quickTo(pointerCircleRef.current, "left", {
        duration: 0.4,
        ease: "power3",
      }),
      yTo = gsap.quickTo(pointerCircleRef.current, "top", {
        duration: 0.4,
        ease: "power3",
      });

    const handleMove = (e) => {
      xTo(e.pageX);
      yTo(e.pageY);
    };
    gsap.to(".circ-image", {
      rotate: 360,
      duration: 10,
      repeat: -1,
      ease: "none",
    });

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  });
  const [fov, setFov] = useState(window.innerWidth >= 768 ? 25 : 40);

  useEffect(() => {
    const handleResize = () => {
      setFov(window.innerWidth >= 768 ? 25 : 40);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div
        ref={pointerCircleRef}
        className="pointer-events-none absolute left-[50%] top-[50%] z-[10000] aspect-square w-[10vw] translate-x-[-50%] translate-y-[-50%] mix-blend-difference"
      >
        <img className="circ-image" src={CircleSvg} alt="Circular shape" />
        <div className="absolute left-[50%] top-[50%] aspect-square w-[2vw] translate-x-[-50%] translate-y-[-50%] rounded-full bg-white"></div>
      </div>
      <div className="Hero relative overflow-hidden">
        <div ref={CanvasRef} className="Canvas-Wrapper absolute z-[4]">
          <Canvas
            className="Canvas absolute h-full w-full"
            camera={{
              fov: fov,
              position: [0, 0, -5],
            }}
            frameloop="demand"
            dpr={isHighEndDevice ? window.devicePixelRatio : 1}
            shadows
          >
            <ModelComponent />
            <Process />
          </Canvas>
        </div>
        <HeroHtml />
      </div>
      <div
        ref={HeroRef}
        className="Menu relative z-50 h-[100vh] w-screen"
      ></div>
    </>
  );
};

export default Hero;
