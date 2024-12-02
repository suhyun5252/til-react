import { useState } from "react";

const Sample3 = () => {
  // 다크모드, 라이트 모드 관리
  const [isDark, setIsDark] = useState(false);
  // 화면의 CSS Object
  const ThemeCSS = {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100vh",
    display: "flex",
    transition: "all .5s",
    backgroundColor: isDark ? "#000" : "#fff",
  };
  return (
    <div style={ThemeCSS}>
      <button onClick={() => setIsDark(!isDark)}>테마 변경</button>
    </div>
  );
};

export default Sample3;
