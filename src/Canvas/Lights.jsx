import React, { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper, PointLightHelper } from "three";

const Lights = () => {
  const dirLightRef = useRef();
  const pointLightRef = useRef();

  return (
    <>
      {/* Ambient light */}

      {/* Directional light */}
      <directionalLight
        // ref={dirLightRef}
        castShadow
        intensity={3}
        position={[9, 0, 0]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        color="white"
      />
      <directionalLight
        // ref={dirLightRef}
        castShadow
        intensity={3}
        position={[-4, 0, -10]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        color="white"
      />
    </>
  );
};

export default Lights;
