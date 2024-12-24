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
