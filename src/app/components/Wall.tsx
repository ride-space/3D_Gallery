"use client";

export const Wall = () => {
  return (
    <mesh receiveShadow position={[0, 2, 0]} scale={[8, 4, 4]}>
      <planeGeometry />
      <meshStandardMaterial color="gray" metalness={0.1} roughness={1} />
    </mesh>
  );
};
