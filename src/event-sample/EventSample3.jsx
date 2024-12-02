import { useState } from "react";
// Interval 즉 시간마다 함수 실행
// const si =setInterval(()=>{},1000);
// clearInterval(si)

// Timeout 즉, 시간 후 함수 실행 => 완료
// const st = setTimeout(()=>{},1000)
// clearTimeout(st)

const EventSample3 = () => {
  const testWord = "안녕하세요.";
  const [userWord, setUserWord] = useState("");
  const [feedback, setFeedback] = useState("🎆시작하시요.");
  const [gameTime, setGameTime] = useState(0);
  const [start, setStart] = useState(false);
  const [timeId, setTimeId] = useState(null);

  const gameStart = () => {
    if (start === false) {
      // 타이머 만들자.
      setStart(true);
      const tt = setInterval(() => {
        // 아래는 상태값 gameTime 을 침조한다
        // 아래는 실행될 당시의 값이다.
        // 업데이트를 하고 있는데 다시 업데이트를 하면 오류다.
        // 그러나 오류가 나도 띄워주지 않고 묻어버린다.
        // 이유는 언제 업데이트가 되었는지 보장할 수 없다.
        // setGameTime(gameTime + 1);

        // 아래 방식은 값을 업데이트 할 때
        // 값이 아니라 업데이트 함수를 전달하는것
        // 아래는 함수여서 항상 실행을 보장한다.
        // setGameTime(보관값 => {  return 보관값 + 1; });
        setGameTime(prev => prev + 1);
        console.log("할일 좀해라. ㅠㅠ");
      }, 1000);
      //   setTimeId(식별자);
      setTimeId(tt);
    }
  };

  const gameIng = event => {
    setUserWord(event.target.value);
    // 비교해서 업데이트
    if (event.target.value === testWord) {
      setFeedback("잘~~ 작성하고 계시네요(●'◡'●)");
    } else {
      setFeedback("오타에요(┬┬﹏┬┬)");
    }
  };
  const gameResult = event => {
    if (event.key === "Enter") {
      alert("고생했어요.");
      clearInterval(timeId);
    }
  };
  return (
    <div>
      <h1>키보드 타이핑 연습 웹 앱서비스</h1>
      <p>
        다음문장을 작성하시오: <b>{testWord}</b>
      </p>
      <button
        onClick={() => {
          gameStart();
        }}
      >
        게임시작
      </button>
      <div>{gameTime}</div>
      <div>{feedback}</div>
      <div>
        <label htmlFor="userinput">입력글</label>
        <input
          value={userWord}
          id="userinput"
          onChange={event => {
            gameIng(event);
          }}
          onKeyDown={event => gameResult(event)}
        />
      </div>
    </div>
  );
};

export default EventSample3;
