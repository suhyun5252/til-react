import { useState } from "react";

const Sample6 = () => {
  const [isRed, setIsRed] = useState(false);
  const [isBlue, setIsBlue] = useState(false);
  const [isYellow, setIsYellow] = useState(false);
  const Css = {
    backgroundColor: isRed
      ? "red"
      : isBlue
        ? "blue"
        : isYellow
          ? "yellow"
          : "#fff",
  };
  return (
    <div style={Css}>
      <div>색상이 바뀌어요.</div>
      <button
        onClick={() => {
          setIsRed(true);
          setIsBlue(false);
          setIsYellow(false);
        }}
      >
        빨강
      </button>
      <button
        onClick={() => {
          setIsRed(false);
          setIsBlue(true);
          setIsYellow(false);
        }}
      >
        파랑
      </button>
      <button
        onClick={() => {
          setIsRed(false);
          setIsBlue(false);
          setIsYellow(true);
        }}
      >
        노랑
      </button>
    </div>
  );
};

export default Sample6;
