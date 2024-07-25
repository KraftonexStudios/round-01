import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useContext, useRef } from "react";
import "../CSS/Overlay.css";
import { refContext } from "../Context/RefContext";
import { scrollSectionsdata } from "../Constants";
import { RiSteering2Fill } from "react-icons/ri";

const OverLay = () => {
  const { OverLayStaticRef, HeroRef } = useContext(refContext);
  const scrollSectionRef = useRef();
  const OverLayScrollRef = useRef();
  const overtl = useRef();
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
    const carDataElements = document.querySelectorAll(".car-data");

    const handleMouseEnter = (element) => {
      gsap.to(element, {
        scale: 1.1,
        duration: 0.5,
      });
    };

    const handleMouseLeave = (element) => {
      gsap.to(element, {
        scale: 1,
        duration: 0.5,
      });
    };

    carDataElements.forEach((element) => {
      element.addEventListener("mouseenter", () => handleMouseEnter(element));
      element.addEventListener("mouseleave", () => handleMouseLeave(element));
    });

    return () => {
      carDataElements.forEach((element) => {
        element.removeEventListener("mouseenter", () =>
          handleMouseEnter(element),
        );
        element.removeEventListener("mouseleave", () =>
          handleMouseLeave(element),
        );
      });
    };
  });
  useGSAP(() => {
    overtl.current = gsap
      .timeline({
        scrollTrigger: {
          trigger: OverLayScrollRef.current,
          start: "-80% top",
          // markers: true,
        },
      })
      .from(".car-data", {
        yPercent: -50,
        duration: 0.5,
        opacity: 0,
      })
      .from(".decr-b", {
        yPercent: 20,
        ease: "power4.out",
        opacity: 0,
      })
      .from(".Video-l", {
        yPercent: 20,
        duration: 1,
        stagger: 0.1,
        opacity: 0,
      })
      .to(".video-clip", {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 2,
        ease: "power4.out",
      });
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
                  className="video-clip h-full w-full overflow-hidden"
                  src="../../Video/Charging.mp4"
                  muted
                  loop
                  autoPlay
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
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
