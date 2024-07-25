import React, { useRef } from "react";
import Hero from "../../Components/Hero";
import OverLay from "../../Components/Overlay";
// import { ReactLenis } from "lenis/dist/lenis-react";
import { ReactLenis } from "lenis/react";
import HorizontalScroll from "../../Components/HorizontalScroll";
import { RefContextWrapper } from "../../Context/RefContext";
import Footer from "../../Components/Footer";
import Preloader from "../../Components/Preloader";
import Interior from "../../Components/Interior";
import Detection from "../../Components/Detection";
import Modelchoice from "../../Components/Modelchoice";

const Home = () => {
  const MainRef = useRef();
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.9,
        duration: 2,
      }}
    >
      <main ref={MainRef} className="relative w-screen overflow-hidden">
        <RefContextWrapper>
          <Hero />
          <OverLay />
          <HorizontalScroll />
          <Interior />
          <Detection />
          <Modelchoice />
        </RefContextWrapper>
        <Footer />
      </main>
    </ReactLenis>
  );
};

export default Home;
