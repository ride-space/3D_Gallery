"use client";

import { MeshReflectorMaterial } from "@react-three/drei";

export const Ground = () => {
  return (
    <mesh receiveShadow position={[0, 0, 2]} rotation={[-Math.PI / 2, 0, 0]} scale={[8, 4, 4]}>
      <planeGeometry />
      <MeshReflectorMaterial
        color="dimgray"
        mirror={0}
        resolution={1024}
        blur={1}
        metalness={0.5}
        depthScale={1}
      />
    </mesh>
  );
};

