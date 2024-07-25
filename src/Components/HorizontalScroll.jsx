import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Exterior from "../Horizontal/Exterior";
import SideFrontView from "../Horizontal/SideFrontView";
import BackView from "../Horizontal/BackView";
import { useRef } from "react";
import "../CSS/Horizontal.css";

const HorizontalScroll = () => {
  const horizontalRef = useRef();
  const horizontalScrollRef = useRef();
  useGSAP(
    (context) => {
      gsap.to(horizontalScrollRef.current, {
        x: () => -window.innerWidth * 3,
        ease: "none",
        scrollTrigger: {
          // markers: true,
          trigger: horizontalRef.current,
          start: "top top",
          pinType: "fixed",
          end: () => (window.innerWidth < 600 ? "+=200%" : "+=400%"),
          pin: horizontalRef.current,
          anticipatePin: 1,
          scrub: 3,
          pinnedContainer: horizontalRef.current,
          preventOverlaps: true,
          // invalidateOnRefresh: true,
        },
        willChange: "transform",
      });
    },
    { scope: horizontalRef },
  );
  return (
    <>
      <section ref={horizontalRef} className="Horizontal-sec">
        <div ref={horizontalScrollRef} className="horizontal-containerr">
          <div className="relative h-[100vh] w-[100vw]">
            <Exterior />
          </div>
          <div className="relative h-[100vh] w-[200vw]">
            <SideFrontView />
          </div>
          <div className="relative h-[100vh] w-[100vw]">
            <BackView />
          </div>
        </div>
      </section>
    </>
  );
};

export default HorizontalScroll;
