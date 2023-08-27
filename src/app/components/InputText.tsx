import { Html } from "@react-three/drei";
import { inputTextTypes } from "@/app/types";

export const InputText = ({
  handleKeyPress,
  inputRef,
  loading,
}: inputTextTypes) => {
  return (
    <group position={[0, 0.3, 0.05]}>
      {/* 3D内にHTMLを使用できる */}
      <Html center>
        {loading ? (
          <div className="flex justify-center">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-white  border-t-transparent"></div>
          </div>
        ) : (
          <div>
            <input
              type="text"
              ref={inputRef}
              className="text-black rounded px-2 py-1 outline-none w-[270px] bg-white bg-opacity-40 shadow"
              // エンターキーを押されたことを検知
              onKeyDown={handleKeyPress}
            />
          </div>
        )}
      </Html>
    </group>
  );
};
