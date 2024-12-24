# useRef

- `리랜더링 하여도 값을 보관`한다.
- 화면 출력 용도는 아님
- 용도
  : html 태그 참조
  : 변수값 참조

## DOM 요소 접근

- App.jsx

```jsx
import { useRef } from "react";

function App() {
  // 태그참조
  const inputRef = useRef(null);
  const handleFocus = () => {
    // console.log(inputRef);
    // current를 통해서 참조한다.
    inputRef.current.focus();
  };
  return (
    <div>
      <h1>포커스 이동</h1>
      {/* ref로 연결한다. */}
      <input ref={inputRef} placeholder="아이디 입력" />
      <button type="button" onClick={handleFocus}>
        입력창 이동
      </button>
    </div>
  );
}
export default App;
```

### 값 접근 및 저장

- 리랜더링 시에도 값을 보관한다.

```jsx
import { useRef } from "react";

function App() {
  const countRef = useRef(0);
  const incre = () => {
    countRef.current++;
    console.log(countRef.current);
  };
  return (
    <div>
      <h1>값 보관 및 저장{countRef.current}</h1>
      <button onClick={incre}>증가</button>
    </div>
  );
}
export default App;
```

## 응용예제

- 태그위치로 이동하기

```jsx
import { useRef } from "react";

function App() {
  const compRef = useRef(null);
  const topRef = useRef(null);
  const moveComp = () => {
    console.log("회사소개로 이동");
    compRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const topMove = () => {
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div ref={topRef}>
      <h1>스크롤해보기</h1>
      <button onClick={moveComp}>회사소개</button>
      <div style={{ height: "100vh", backgroundColor: "green" }}>인사말</div>
      <div ref={compRef} style={{ height: "100vh", backgroundColor: "gray" }}>
        회사소개
      </div>
      <button
        onClick={topMove}
        style={{ position: "fixed", right: 30, bottom: 30 }}
      >
        위로가기
      </button>
    </div>
  );
}
export default App;
```

- 폼 초기화

```jsx
import { useRef } from "react";

function App() {
  const inputRef = useRef(null);
  const clear = () => {
    // 폼값 초기화
    inputRef.current.value = "";
  };
  return (
    <div>
      <input ref={inputRef} placeholder="이름" />
      <button onClick={clear}>값 초기화</button>
    </div>
  );
}
export default App;
```

- 비디오 제어

```jsx
import { useRef } from "react";

function App() {
  const videoRef = useRef(null);
  const prevV = () => {
    videoRef.current.currentTime -= 10;
    videoRef.current.play();
  };
  const playV = () => {
    // 처음으로 돌아가라
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };
  const stopV = () => {
    // 0으로 가서 멈춰라
    videoRef.current.currentTime = 0;
    videoRef.current.pause();
  };
  const nextV = () => {
    videoRef.current.currentTime += 10;
    videoRef.current.play();
  };
  return (
    <div>
      <h1>Video 제어</h1>
      <video ref={videoRef} src="비디오주소url" muted autoPlay controls></video>
      <div>
        <button onClick={prevV}>10초 전</button>
        <button onClick={playV}>Play</button>
        <button onClick={stopV}>Stop</button>
        <button onClick={nextV}>10초 후</button>
      </div>
    </div>
  );
}
export default App;
```
