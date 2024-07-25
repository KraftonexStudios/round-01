import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { ModelBuild } from "../../Canvas/RangeRoverBuild";
import Lights from "../../Canvas/Lights";
import BuildEnvro from "../../Components/BuildEnvro";
import "../../CSS/Build.css";
import { Editors, carOptions } from "../../Constants";
import {
  CharacterAnimationsProvider,
  useCharacterAnimations,
} from "../../Context/AnimationContext";
import Process from "../../Components/Process";
import { NavLink } from "react-router-dom";
const ModelHtmlComp = ({ skincode, setSkincode }) => {
  const editorRef = useRef();
  const filterRef = useRef();
  const [Filtername, setFiltername] = useState("Exterior");
  const [colorcode, setcolorcode] = useState({
    Exterior: "#FFFFFF",
    Interior: "#F4F2ED",
    Wheels: "#A6A6A6",
    Lights: "#FFFFFF",
  });
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [currentFiltername, setCurrentFiltername] = useState("");

  const handleClick = (code, filtername) => {
    setSkincode({ code, name: filtername });
    setcolorcode((prev) => ({ ...prev, [filtername]: code }));
  };

  const handleActionMenuClick = (name) => {
    if (currentFiltername === name) {
      setIsEditorVisible(!isEditorVisible);
      setCurrentFiltername("");
    } else {
      setIsEditorVisible(true);
      setCurrentFiltername(name);
      setFiltername(name);
    }
  };

  const { animations, animationIndex, setAnimationIndex } =
    useCharacterAnimations();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target) &&
        !editorRef.current.contains(event.target)
      ) {
        setIsEditorVisible(false);
        setCurrentFiltername("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="editor-con">
      <div className="editor-left-con">
        <div ref={editorRef} className="action-menu">
          {Editors.map((element) => {
            return (
              <div
                key={element.name}
                onClick={() => handleActionMenuClick(element.name)}
                className="action"
              >
                <div className="img-con">
                  <img src={element.image} alt="" />
                </div>
                <h4
                  className={`rounded-full border-[1px] border-transparent px-3 py-1 ${
                    currentFiltername === element.name
                      ? "border-[1px] border-white"
                      : ""
                  }`}
                >
                  {element.name}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
      {isEditorVisible && (
        <div className={`editor-right-con ${isEditorVisible ? "visible" : ""}`}>
          <div ref={filterRef} className="filter-con">
            {carOptions[Filtername].map((skin) => {
              return (
                <div
                  onClick={() => handleClick(skin.code, Filtername)}
                  className="filter"
                  key={skin.code}
                >
                  <div
                    style={{ background: skin.code }}
                    className="img-con2 overflow-hidden rounded-lg"
                  >
                    <img src={skin.image} alt="" />
                  </div>
                  <h4
                    className={`rounded-full border-[1px] border-transparent px-3 py-1 ${
                      skin.code === colorcode[Filtername]
                        ? "border-[1px] border-white"
                        : ""
                    }`}
                  >
                    {skin.name}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="specification-con">
        <div className="l-speci">
          <NavLink to="/">
            <h4>Back</h4>
          </NavLink>
        </div>
        <div className="r-speci">
          <div className="speci">SPECIFICATIONS</div>
          <h1>POWERTRAIN</h1>
          <div className="speci-c">
            <h4>CAPACITY</h4>
            <p>2,997(cc)</p>
          </div>
          <div className="speci-s">
            <h4>MAX SPEED</h4>
            <p>234 km/h</p>
          </div>
          <div className="button-con">
            {animations.map((animation, index) => {
              if (index === 1 || index === 2) {
                return (
                  <button
                    key={animation}
                    onClick={() => setAnimationIndex(index)}
                    className={`pointer-events-auto`}
                    style={
                      index === animationIndex
                        ? { border: "1px solid rgba(255, 255, 255, 1)" }
                        : { border: "1px solid rgba(255, 255, 255, .2)" }
                    }
                  >
                    {animation}
                  </button>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const Build = () => {
  const [skincode, setSkincode] = useState({
    code: "#FFFFFF",
    name: "Exterior",
  });
  const isHighEndDevice = navigator.deviceMemory && navigator.deviceMemory > 4;

  const takeScreenshot = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      requestAnimationFrame(() => {
        const dataURL = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.setAttribute("download", "canvas.png");
        link.setAttribute(
          "href",
          dataURL.replace("image/png", "image/octet-stream"),
        );
        link.click();
      });
    }
  };
  const [fov, setFov] = useState(window.innerWidth >= 768 ? 15 : 30);

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
    <CharacterAnimationsProvider>
      <div className="relative flex h-[100vh] w-[100vw]">
        <Canvas
          className="Canvas pointer-events-auto h-full w-full"
          camera={{
            fov: fov,
            position: [-5.5, 0, 5.7],
          }}
          dpr={isHighEndDevice ? window.devicePixelRatio : 1}
        >
          <mesh
            scale={2}
            position={[0, -0.72, 0]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
          >
            <ringGeometry args={[0.9, 1, 500, 1]} />
            <meshStandardMaterial
              emissiveIntensity={20}
              emissive="blue"
              color="lightblue"
              roughness={0.75}
            />
          </mesh>

          <OrbitControls
            makeDefault
            enableZoom
            maxPolarAngle={Math.PI / 2}
            minDistance={0}
            maxDistance={9.5}
            enablePan={false}
          />
          <color attach="background" args={["#15151a"]} />
          <Lights />
          <ModelBuild skin={skincode} />
          <BuildEnvro />
          <Process />
        </Canvas>
        <ModelHtmlComp skincode={skincode} setSkincode={setSkincode} />
        <button onClick={takeScreenshot} className="screenshot-button">
          Capture Your Dream
        </button>
      </div>
    </CharacterAnimationsProvider>
  );
};

export default Build;
