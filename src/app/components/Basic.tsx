"use client";

import { useRef } from "react";
import { Perf } from "r3f-perf";
import { OrbitControls, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Basic = () => {
  const boxRef = useRef<THREE.Mesh>(null);
  const directionalLight = useRef<THREE.DirectionalLight>(null);

  // 平行光のヘルペー(光が来る位置がわかる)
  useHelper(
    directionalLight as React.MutableRefObject<THREE.DirectionalLight>,
    THREE.DirectionalLightHelper,
    1,
    "red"
  );

  // アニメーションの追加
  useFrame((state, delta) => {
    // 経過時間
    const time = state.clock.elapsedTime;
    if (boxRef.current) {
      // X移動
      boxRef.current.position.x = Math.sin(time) + 1.5;
      // Y移動
      boxRef.current.rotation.y += delta;
    }
  });
  return (
    <>
      {/* マウスでカメラをコントロール */}
      <OrbitControls makeDefault />
      {/* パフォーマンスをチェック ※3Dは重くなるのでパフォーマンスに注意 */}
      <Perf position="top-left" />

      {/* 背景 */}
      <color args={["ivory"]} attach="background"></color>

      {/* 環境光(全体の光 影❌) */}
      <ambientLight intensity={0.5} />
      {/* 平行光(太陽の光みたいな) */}
      <directionalLight
        castShadow
        ref={directionalLight}
        position={[1, 2, 3]}
        intensity={0.5}
        shadow-mapSiza={[1024, 1024]}
      />

      <group position={[0, -1, 0]}>
        {/* 球体 scaleは大きさ*/}
        <mesh castShadow position={[-1, 0.6, 0]} scale={0.6}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        {/* 箱 */}
        <mesh castShadow position={[1, 0.5, 0]} ref={boxRef}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
        {/* 平面 */}
        <mesh receiveShadow rotation-x={-Math.PI * 0.5} scale={10}>
          <planeGeometry />
          <meshStandardMaterial color="lightseagreen" />
        </mesh>
      </group>
    </>
  );
};
