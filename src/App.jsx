import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/HOME/Home";
import Navbar from "./Components/Navbar";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import Preloader from "./Components/Preloader";
import * as THREE from "three";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [laoder, setLoader] = useState(true);
  useEffect(() => {
    THREE.DefaultLoadingManager.onLoad = () => {
      setLoading(false);
    };
    const LoaderId = setTimeout(() => {
      setLoader(false);
    }, 4 * 1000);
    return () => {
      clearTimeout(LoaderId);
    };
  }, []);

  return (
    <>
      {isLoading || laoder ? (
        <Preloader />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
