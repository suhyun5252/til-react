import { useState } from "react";

const EventSample2 = () => {
  const basictext = '"기본문장이 나타나는 자리입니다."';
  const [userVal, setUserVal] = useState("");
  const [feedback, setFeedback] = useState("");

  //PRD (요구 사항 명세문서)

  // 키보드 타이핑 연습 웹 앱서비스

  // 1. 기본 문장이 주어진다.

  // 2. 사용자는 텍스트 필드에 입력을 한다.

  // 3. 사용자가 텍스트를 입력 중에 오타를 피드백 받는다.
  // 3.1. 피드백은 입력 중 동일하게 작성중이면
  //      잘~~ 작성하고 계시네요(●'◡'●). 글자를 보여준다.

  // 3.2. 피드백은 입력 중 일부가 다르면
  //      오타에요(┬┬﹏┬┬).  글자를 보여준다.

  // 4. 모든 문서가 맞게 작성되었다고 하면 Enter 키를 입력하고
  //    몇초 걸렸는지를 출력한다. (setInterval)

  //   const feedbackBox = ()=>{
  //     if()
  //   }
  return (
    <div>
      <h1>키보드 타이핑 연습 웹 앱서비스</h1>
      <form>
        <h4 name="basictext" value={"기본 문장이 나타남"}>
          기본 문장이 나타남
        </h4>
        <h4>{userVal}</h4>
        <label htmlFor="userValue">타자연습</label>
        <input
          type="text"
          name="uservalue"
          id="userValue"
          value={typingData.uservalue}
          placeholder="위에 문장을 따라치세요."
          onChange={event => {
            // console.log(event.target.value);
            // console.log(event.target.name);
            setUserVal({ ...userVal, [event.target.name]: event.target.value });
          }}
        />
        <p name="resultarea" value={""}>
          {}
        </p>
        <button type="submit">끝</button>
      </form>
      <div>
        <label></label>
        <input type="text" />
      </div>
    </div>
  );
};

export default EventSample2;
