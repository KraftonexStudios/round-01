import React, { useRef, useState } from "react";
import { NavBar1, NavBar2 } from "../Constants/index";
import { NavLink } from "react-router-dom";
import "../CSS/Nav.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CiBookmark, CiBookmarkPlus } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
const Navbar = () => {
  const [nav, SetNav] = useState(false);
  const tl = useRef();
  useGSAP(() => {
    let mm1 = gsap.matchMedia();
    const breakPoint = 1024;
    mm1.add(
      {
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        let { isMobile } = context.conditions;
        tl.current = gsap
          .timeline({ paused: true })

          .from(".overlay-nav", {
            opacity: 0,
            duration: 0.1,
          })
          .from(".overlay-black", {
            yPercent: -100,
          })
          .from(".ul", {
            opacity: 0,
            stagger: 0.2,
          });
      },
    );
  }, {});
  const toggleNav = () => {
    SetNav((prev) => !prev);
    if (tl.current) {
      if (tl.current.paused()) {
        tl.current.play();
      } else {
        tl.current.reversed(!tl.current.reversed());
      }
    }
  };
  return (
    <>
      <nav className="Main-nav">
        <div className="left-nav">
          {NavBar1.map((link) => {
            return (
              <NavLink
                key={link}
                className="nav-link"
                to={link === "HOME" ? "/" : link}
              >
                {({ isActive }) => {
                  return (
                    <h4 className={!isActive ? "text-zinc-500" : "text-white"}>
                      {link}
                    </h4>
                  );
                }}
              </NavLink>
            );
          })}
        </div>

        <div className="logo-range absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
          <img
            className="h-full w-full"
            src="../../Images/Group.png"
            alt="RANGE ROVER"
          />
        </div>
        <div className="rigth-nav">
          {NavBar2.map((link) => {
            return (
              <NavLink key={link} className="nav-link" to={link.toLowerCase()}>
                {({ isActive }) => {
                  return (
                    <div
                      className={`flex items-center justify-center gap-1 transition-all hover:scale-[1.1] hover:text-white ${isActive ? "text-white" : "text-gray-500"}`}
                    >
                      {link === "BUILDS" ? (
                        <CiBookmarkPlus fontSize="1.3vw" />
                      ) : (
                        <GrLocation fontSize="1.3vw" />
                      )}
                      <h1>{link}</h1>
                    </div>
                  );
                }}
              </NavLink>
            );
          })}
        </div>
      </nav>
      <div className="Menu-Icon cursor-pointer">
        <input
          onClick={toggleNav}
          type="checkbox"
          role="button"
          aria-label="Display the menu"
          className="menu"
        ></input>
      </div>
      <div className="overlay-nav">
        <div className="overlay-black">
          <ul className="ul">
            <li>OVERVIEW</li>
            <li>GALLERY</li>
          </ul>

          <ul className="ul">
            <li>EXPLORE</li>
            <li>RANGE ROVER SV</li>
          </ul>
          <ul className="ul">
            <li>MODELS AND SPECIFICATIONS</li>
            <li>PERSONALISATION</li>
            <li>OFFERS</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
