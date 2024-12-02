import { useState } from "react";

const EventSample4 = () => {
  // 1) 타이머 시작

  // 2)버튼 클릭 시 타이머가 1초 단위로 증가하며 동작한다.
  // 타이머는 시간:분:초 형식으로 화면에 출력된다.
  // 타이머 중지

  // 3)실행 중인 타이머를 버튼 클릭으로 중지한다.
  // 타이머 중지 상태에서도 현재 시간을 유지한다.
  // 타이머 리셋

  // 4)버튼 클릭 시 타이머를 0으로 초기화한다.
  // 5)초기화 후에는 타이머가 중지된 상태로 유지된다.
  // UI Requirements
  // 타이머 디스플레이
  // 타이머 값이 00:00:00 형식으로 화면 중앙에 출력된다.
  // 버튼
  // Start: 타이머 시작 버튼.
  // Stop: 타이머 중지 버튼.
  // Reset: 타이머를 0으로 초기화하는 버튼.

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // 타이머 시작
  const startTimer = () => {
    if (isRunning === false) {
      setIsRunning(true);
      const wa = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
      setIntervalId(wa);
    }
  };

  const minuteSet = () => {
    if (seconds >= 60) {
      setMinutes(prev => prev + 1);
      setSeconds(0);
    }
  };

  minuteSet();

  const hourSet = () => {
    if (minutes >= 60) {
      setHours(prev => prev + 1);
      setSeconds(0);
    }
  };
  hourSet();
  // 타이머 중지
  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(intervalId);
  };

  // 타이머 리셋
  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(intervalId);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div style={{ fontSize: "48px" }}>
        {seconds < 10 ? "0" + seconds.toString() : seconds}
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={startTimer}
          disabled={isRunning}
          style={{ marginRight: "10px", padding: "10px 20px" }}
        >
          Start
        </button>
        <button
          onClick={stopTimer}
          disabled={!isRunning}
          style={{ marginRight: "10px", padding: "10px 20px" }}
        >
          Stop
        </button>
        <button onClick={resetTimer} style={{ padding: "10px 20px" }}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default EventSample4;
