import { useState } from "react";

const Sample4 = () => {
  // Product Requirements Docment
  // MVP 에자일 방법론, 폭포수 개발방법론
  //  요구 사항 명세문서
  //버튼 클릭하면 팝업창 보이기
  // 보이는 팝업창의 닫기 버튼 클릭하면 창닫기

  //팝업관리
  const [isPop, setIsPop] = useState(false);
  // modalCSS
  const modalCSS = {
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100vh",
    display: isPop ? "flex" : "none",
    justifyContent: "center",
    alignItems: "center",
    transition: "all .5s",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zindex: "999",
  };

  const popupLayerCSS = {
    width: "480px",
    height: "280px",
    backgroundColor: "#fff",
  };

  //모달 닫기
  return (
    <>
      <button onClick={() => setIsPop(!isPop)}>열기</button>
      <div style={modalCSS}>
        <div style={popupLayerCSS}>
          <button onClick={() => setIsPop(!isPop)}>닫기</button>
        </div>
      </div>
    </>
  );
};

export default Sample4;
