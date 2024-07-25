import React, { memo, useContext, useEffect, useMemo, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { DEG2RAD, RAD2DEG } from "three/src/math/MathUtils";
import { invalidate, useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { refContext } from "../Context/RefContext";
import { throttle } from "lodash";

function Models(props) {
  const group = useRef();
  const Cart1 = useRef();
  const Cart2 = useRef();
  const Cart3 = useRef();
  const { nodes, materials, animations } = useGLTF(
    "../../Models/RANGEMODEL.glb",
  );
  const { actions, names, mixer } = useAnimations(animations, group);
  materials.paint.color.set("#A79D8E");
  const camera = useThree((state) => state.camera);

  const { OverLayStaticRef, HeroRef, Choice1Ref, Choice2Ref } =
    useContext(refContext);

  const throttledInvalidate = throttle(() => {
    invalidate();
  }, 100);
  useMemo(() => {
    Object.values(nodes).forEach((element) => {
      if (element.type === "Mesh") {
        element.castShadow = true;
      }
    });
  });
  useEffect(() => {
    materials.paint.roughness = 0.7;
    materials.tire.metalness = 0.9;
    materials["glass_l.001"].emissive.set("red");
    materials["glass_l.001"].emissiveIntensity = "100";
  }, []);
  // =================================================================================
  useGSAP((contextSafe) => {
    const action2 = actions[names[3]];
    // const action = actions[names[4]];
    const action = actions[names[0]];
    action2.timeScale = 0.8;
    action.play();
    action.timeScale = 1.4;
    action.loop = THREE.LoopOnce;
    action.clampWhenFinished = true;
    gsap.from(group.current.rotation, {
      x: 0,
      y: -60 * DEG2RAD,
      z: 0,
      ease: "power1.out",
      duration: 2,
      onUpdate: () => invalidate(undefined, 1),
      onComplete: () => {
        materials.light_e.emissive.set("white");
        materials.light_e.emissiveIntensity = "100";
        materials.light2.emissive.set("red");
        materials.light2.emissiveIntensity = "100";
      },
    });

    let mm1 = gsap.matchMedia();
    const breakPoint = 768;
    mm1.add(
      {
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        let { isDesktop, isMobile, reduceMotion } = context.conditions;
        Cart1.current = gsap
          .timeline({
            defaults: {},
            scrollTrigger: {
              trigger: HeroRef.current,
              // markers: true,
              start: "-90% top",
              end: () => "+=100%",
              onUpdate: () => {
                camera.lookAt(0, 0, 0);
              },
              scrub: true,
              invalidateOnRefresh: true,
              preventOverlaps: true,
            },
          })
          .to(camera.position, {
            x: 1,
            y: 1.2,
            z: 3,
            duration: 4,
            onStart: () => {
              // action.syncWith(action2);
              if (Math.round(nodes["DOOR_L"].rotation.y) === 0 && isDesktop) {
                HandleDoor();
              }
            },
            onUpdate: () => {
              invalidate();
            },
            ease: "none",
          })

          .to(group.current.rotation, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.5,
          })

          .to(camera.position, {
            x: 0,
            y: 0,
            z: -6,
            onComplete: () => {
              invalidate();
            },
            onStart: () => {
              invalidate();
            },
            duration: 0.2,
          });
      },
    );
  }, {});
  useGSAP(() => {
    let mm2 = gsap.matchMedia();
    const breakPoint = 768;
    mm2.add(
      {
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        let { isDesktop, isMobile, reduceMotion } = context.conditions;
        Cart2.current = gsap
          .timeline({
            defaults: {},
            scrollTrigger: {
              trigger: OverLayStaticRef.current,
              start: "-30% top",
              end: "20% top",
              onUpdate: () => {
                invalidate();
                camera.lookAt(0, 0, -1.4);
              },
              scrub: true,
              invalidateOnRefresh: true,
              // markers: true,
            },
          })
          .to(camera.position, {
            x: isDesktop ? -4.5 : 0,
            z: isDesktop ? -1 : 5,
            ease: "none",
          });
      },
    );
  });
  const { contextSafe } = useGSAP((context) => {
    return context.revert();
  });
  let anim = false;
  const HandleDoor = contextSafe(() => {
    const mesh = [nodes["DOOR_L"], nodes["DOOR_R"]];
    if (anim) {
      gsap.to([mesh[0].rotation, mesh[1].rotation], {
        y: 0 * DEG2RAD,
        onUpdate: () => invalidate(undefined, 2),
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
        onUpdate: () => invalidate(undefined, 2),
      });
    }
  });
  return (
    <group
      ref={group}
      {...props}
      rotation={[0, 150 * DEG2RAD, 0]}
      position={[0, -0.72, 0]}
      dispose={null}
      onClick={HandleDoor}
      scale={1}
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
export const Model = memo(Models);
useGLTF.preload("../../Models/RANGEMODEL.glb");
