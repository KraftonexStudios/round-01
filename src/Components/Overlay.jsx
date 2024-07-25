import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useContext, useRef } from "react";
import "../CSS/Overlay.css";
import { refContext } from "../Context/RefContext";
import { scrollSectionsdata } from "../Constants";
import { RiSteering2Fill } from "react-icons/ri";
import { useLenis } from "lenis/react";
// import { useLenis } from "lenis/dist/lenis-react";

const OverLay = () => {
  const { OverLayStaticRef, HeroRef } = useContext(refContext);
  const scrollSectionRef = useRef();
  const OverLayScrollRef = useRef();
  useGSAP(() => {
    gsap.to(OverLayScrollRef.current, {
      y: "-100%",
      scrollTrigger: {
        trigger: HeroRef.current,
        // markers: true,
        start: "-50% top",
        end: "50% top",
        scrub: 0.5,
      },
    });
  });
  useLenis(({ velocity, isTouching }) => {
    if (window.innerWidth > 1024) {
      const carDataElements = document.querySelectorAll(".car-data");

      carDataElements.forEach((element) => {
        element.style.transform = `skewY(${-velocity * 0.4}deg)`;
      });
    }
  });

  return (
    <>
      <div ref={OverLayStaticRef} className="overlay-section-con">
        <div ref={OverLayScrollRef} className="Overlay-section absolute top-0">
          <div className="Bottom-overlay">
            <section ref={scrollSectionRef} className="car-data-main">
              <div className="car-data-con">
                {scrollSectionsdata.map((doc, i) => {
                  return (
                    <div key={i} className="car-data">
                      <div className="img-con-data">
                        {i === 0 ? (
                          <RiSteering2Fill
                            style={{ height: "3rem", width: "3rem" }}
                          />
                        ) : (
                          <img
                            className="car-data-img"
                            src={`${doc.icon}`}
                            alt=""
                          />
                        )}
                      </div>
                      <h1 className="car-data-title">{doc.title}</h1>
                      <p className="car-data-description">{doc.description}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
          <div className="Top-overlay">
            <div className="decr-b">
              <p>
                Lead by example. Join the
                <span
                  style={{ fontFamily: "Range_M" }}
                  className="px-2 text-zinc-200"
                >
                  Range Rover Electric
                </span>
                waiting list for the opportunity to be among the first to place
                a pre-order in 2024.
              </p>
            </div>
            <div className="Video-btn">
              <div className="Video-l">
                <h1>Join the waiting list</h1>
              </div>
              <div className="Video-r">
                <video
                  className="h-full w-full overflow-hidden"
                  src="../../Video/Charging.mp4"
                  muted
                  loop
                  autoPlay={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverLay;
