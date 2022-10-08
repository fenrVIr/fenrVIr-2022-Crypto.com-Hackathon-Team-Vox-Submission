import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import {useFrame} from '@react-three/fiber'

export default function Model(props) {
  const ref = useRef()
  const { nodes, materials } = useGLTF("./megaphone/Megaphone_01_4k.gltf");
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.05
  })
  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        scale={11}
        geometry={nodes.Megaphone_01.geometry}
        material={materials.Megaphone_01}
      />
    </group>
  );
}

useGLTF.preload("./megaphone/Megaphone_01_4k.gltf");