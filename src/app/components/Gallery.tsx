"use client";

import { useRef, useState, KeyboardEvent } from "react";
import { Perf } from "r3f-perf";
import { OrbitControls, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Wall } from "./Wall";
import { Ground } from "./Ground";
import { Pole } from "./Pole";
import { FrameList } from "./FrameList";
import { InputText } from "./InputText";

export const Gallery = () => {
  const [image, setImage] = useState("./pic2.jpg");
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  // 絵画リスト
  const images = [
    {
      id: "1",
      position: [-1.7, 0.5, 0.05],
      image: "./pic1.jpg",
    },
    {
      id: "2",
      position: [0, 0.5, 0.05],
      image: image, // AIで画像を生成する
    },
    {
      id: "3",
      position: [1.7, 0.5, 0.05],
      image: "./pic3.jpg",
    },
  ];

  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    // エンターキーが押されたら
    if (e.key === "Enter") {
      e.preventDefault();
      setLoading(true);

      const inputValue = inputRef.current?.value;

      if (!inputValue) {
        setLoading(false);
      }

      try {
        const res = await fetch("/api/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: inputValue,
          }),
        });

        const data = await res.json();

        setImage(`data:image/png;base64,${data.photo}`);
      } catch (error) {
        alert(error);
      }

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      setLoading(false);
    }
  };

  return (
    <>
      {/* マウスでカメラをコントロール */}
      {/* <OrbitControls makeDefault /> */}
      {/* パフォーマンスをチェック ※3Dは重くなるのでパフォーマンスに注意 */}
      {/* <Perf position="top-left" /> */}

      {/* 背景 */}
      <color args={["ivory"]} attach="background"></color>

      {/* 環境光(全体の光 影❌) */}
      <ambientLight intensity={0.5} />

      <group position={[0, -1, 0]}>
        {/* 壁 */}
        <Wall />
        {/* 地面 */}
        <Ground />
        {/* ポール */}
        <Pole />
        {/* ポール */}
        <FrameList images={images} />

        {/* 入力フォーム */}
        <InputText
          handleKeyPress={handleKeyPress}
          inputRef={inputRef}
          loading={loading}
        />
      </group>
    </>
  );
};
