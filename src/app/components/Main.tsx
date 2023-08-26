"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
// import { Basic } from "./Basic";
import { Gallery } from "./Gallery";
export const Main = () => {
  return (
    <div className="w-full h-screen">
      <Canvas
        // フラットシェーディング https://onl.bz/q3BGd3b
        flat
        shadows
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputEncoding: THREE.sRGBEncoding,
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [0, 0, 4],
        }}
      >
        {/* 動作確認 */}
        {/* <Basic /> */}
        <Gallery />

      </Canvas>
    </div>
  );
};
