import React, { memo, useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import * as THREE from "three";
import { useCharacterAnimations } from "../Context/AnimationContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DEG2RAD } from "three/src/math/MathUtils";
function ModelBuilds({ skin }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "../../Models/RANGEMODEL.glb",
  );
  const { actions, names } = useAnimations(animations, group);
  const { setAnimations, animationIndex } = useCharacterAnimations();

  useEffect(() => {
    materials["light_e"].emissiveIntensity = 100;
    materials.light2.emissive.set("red");
    materials.light2.emissiveIntensity = "100";
    setAnimations(names);
  }, [names]);
  useEffect(() => {
    actions[names[1]].loop = THREE.LoopOnce;
    actions[names[1]].clampWhenFinished = true;
    actions[names[2]].loop = THREE.LoopOnce;
    actions[names[2]].clampWhenFinished = true;
    actions[names[animationIndex]]?.reset().fadeIn(0.5).play();
    return () => {
      actions[names[animationIndex]]?.fadeOut(0.5);
    };
  }, [animationIndex]);
  const camera = useThree((state) => state.camera);
  useFrame((state, delta) => {
    if (skin.name === "Exterior") {
      easing.dampC(materials.paint.color, skin.code, 0.45, delta);
    }
    if (skin.name === "Interior") {
      easing.dampC(materials.LEATHER.color, skin.code, 0.25, delta);
    }
    if (skin.name === "Wheels") {
      easing.dampC(materials.bhrome.color, skin.code, 0.25, delta);
    }
    if (skin.name === "Lights") {
      // Update the emissive color
      easing.dampC(materials.light_e.emissive, skin.code, 0.25, delta);
      easing.dampC(materials.light_e, skin.code, 0.1, delta);
      // Set the emissive intensity
    }
  });
  const { contextSafe } = useGSAP(
    (context, contextSafe) => {
      if (skin.name === "Interior") {
        gsap.to(camera.position, {
          x: 0,
          y: 0.4,
          z: -0.9,
          duration: 2,
        });
      }
      if (skin.name === "Exterior") {
        gsap.to(camera.position, {
          x: -5.5,
          y: 0,
          z: 5.7,
          duration: 2,
        });
      }
      if (skin.name === "Wheels") {
        gsap.to(camera.position, {
          x: 6,
          y: 0,
          z: 5,
          duration: 2,
        });
      }
      if (skin.name === "Lights") {
        gsap.to(camera.position, {
          // easing.damp3(camera.position, [0, 0.4, -0.9], 0.25, delta);
          x: 0,
          y: 0,
          z: 5,
          duration: 2,
        });
      }
    },
    { dependencies: [skin.code] },
  );

  let anim = false;
  const HandleDoor = contextSafe(() => {
    const mesh = [nodes["DOOR_L"], nodes["DOOR_R"]];
    if (anim) {
      gsap.to([mesh[0].rotation, mesh[1].rotation], {
        y: 0 * DEG2RAD,
        onComplete: () => {
          anim = false;
        },
      });
    } else {
      gsap.to([mesh[0].rotation, mesh[1].rotation], {
        y: (x) => (x == 1 ? -60 * DEG2RAD : 60 * DEG2RAD),
        onComplete: () => {
          anim = true;
        },
      });
    }
  });

  return (
    <group
      ref={group}
      onClick={HandleDoor}
      position={[0, -0.72, 1.4]}
      dispose={null}
    >
      <group name="Scene">
        <group name="Car_Rig" position={[0, 0, -2.183]}>
          <primitive object={nodes["DEF-Body"]} />
          <primitive object={nodes["DEF-WheelFtL"]} />
          <primitive object={nodes["DEF-WheelFtR"]} />
          <primitive object={nodes["DEF-WheelBkL"]} />
          <primitive object={nodes["DEF-WheelBkR"]} />
          <primitive object={nodes["DEF-WheelBrakeFtL"]} />
          <primitive object={nodes["DEF-WheelBrakeFtR"]} />
          <primitive object={nodes["DEF-WheelBrakeBkL"]} />
          <primitive object={nodes["DEF-WheelBrakeBkR"]} />
          <primitive object={nodes.Root} />
          <primitive object={nodes["MCH-WheelrotationFtL"]} />
          <primitive object={nodes["MCH-WheelrotationFtR"]} />
          <primitive object={nodes["MCH-WheelrotationBkL"]} />
          <primitive object={nodes["MCH-WheelrotationBkR"]} />
          <primitive object={nodes["MCH-Steeringrotation"]} />
        </group>
        <group name="WGT-CarRigDriftHandle" />
        <group name="WGT-CarRigRoot" />
        <group name="WGT-CarRigGroundSensor" />
        <group name="WGT-CarRigGroundSensorAxle" />
        <group name="WGT-CarRigWheel" />
        <group name="WGT-CarRigWheelBrake" />
        <group name="WGT-CarRigSteering" />
        <group name="WGT-CarRigSuspension" />
        <group name="WGT-CarRigWheelDamper" />
      </group>
    </group>
  );
}

export const ModelBuild = memo(ModelBuilds);
