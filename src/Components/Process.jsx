import React from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
const Process = () => {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.2}
        luminanceThreshold={3}
        luminanceSmoothing={0.1}
        mipmapBlur={true}
      />
    </EffectComposer>
  );
};

export default Process;
