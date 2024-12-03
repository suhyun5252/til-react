import { useState } from "react";
// map 으로 돌려줄 상수 변수정의
const EMOTION = [
  { id: 0, label: "즐거움", emoji: "😊" },
  { id: 1, label: "기쁨", emoji: "😁" },
  { id: 2, label: "평범", emoji: "😐" },
  { id: 3, label: "화남", emoji: "😡" },
  { id: 4, label: "슬픔", emoji: "😢" },
];
const WEATHER = [
  { id: 0, label: "맑음", emoji: "☀️" },
  { id: 1, label: "흐림", emoji: "☁️" },
  { id: 2, label: "비", emoji: "🌧️" },
  { id: 3, label: "눈", emoji: "❄️" },
];

// 협업 : 공통 Form 요소 : 팀장
const InputFiled = ({ label, type = "text", name, value, onChange }) => {
  return (
    <div style={{}}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        id={name}
      />
    </div>
  );
};

// 협업 : 로그인 (홍길동)
const LoginForm = ({ onSubmit, loginInput, handleChange }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <InputFiled
            label={"아이디"}
            name={"userid"}
            value={loginInput.userid}
            onChange={e => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <InputFiled
            label={"비밀번호"}
            type="password"
            name={"userpass"}
            value={loginInput.userid}
            onChange={e => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <button type="submit">로그인</button>
        </div>
      </form>
    </div>
  );
};

// 협업 : 다이어리 입력창 (고길동)
const EmotionComponent = ({ emotion, name, diaryInput, handleChange }) => {
  return (
    <div style={{ display: "flex", gap: 5 }}>
      {/* 기분 선택을 위한 라디오 버튼 */}
      {emotion.map(item => {
        return (
          <div key={item.id}>
            <input
              type="radio"
              name={name}
              id={`condition-happy-${item.id}`}
              value={item.id}
              checked={diaryInput.condition === item.id}
              onChange={e => {
                handleChange(e);
              }}
            />
            <label htmlFor={`condition-happy-${item.id}`}>
              {item.emoji} {item.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};
const WhetherComponent = ({ name, whether, handleChange, diaryInput }) => {
  return (
    <select
      name={name}
      value={diaryInput.weather}
      onChange={e => {
        handleChange(e);
      }}
    >
      {whether.map(item => {
        return (
          <option value={item.id} key={item.id}>
            {item.emoji} {item.label}
          </option>
        );
      })}
    </select>
  );
};

const DiaryForm = ({ onSubmit, diaryInput, handleChange }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <InputFiled
            label={"제목"}
            type={"text"}
            name={"title"}
            value={diaryInput.title}
            onChange={e => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <InputFiled
            label={"날짜"}
            type={"date"}
            name={"date"}
            value={diaryInput.date}
            onChange={e => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <label>내용</label>
          <textarea
            name="content"
            value={diaryInput.content}
            onChange={e => {
              handleChange(e);
            }}
          ></textarea>
        </div>
        <div>
          <label>기분</label>
          <div>
            {/* 기분자리에요.. */}
            <EmotionComponent
              emotion={EMOTION}
              name={"condition"}
              diaryInput={diaryInput}
              handleChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label>날씨</label>
          <WhetherComponent
            name={"weather"}
            whether={WEATHER}
            handleChange={handleChange}
            diaryInput={diaryInput}
          />
        </div>
        <div>
          <button type="submit">저장</button>
        </div>
      </form>
    </div>
  );
};

// 협업 : 전체 레이아웃(팀장)
const DiarySample = () => {
  // 로그인상태
  const [loginInput, setLoginInput] = useState({
    userid: "",
    userpass: "",
  });
  const handleChangeLogin = e => {
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });
  };
  const handleLoginSubmit = e => {
    e.preventDefault();
    console.log("로그인 데이터:", loginInput);
    alert("로그인 성공!");
    setLoginInput({ userid: "", userpass: "" }); // 입력 초기화
  };

  // 일기 입력 상태
  const initDiary = {
    title: "",
    date: new Date().toISOString().split("T")[0],
    content: "",
    condition: 0, // 기분
    weather: 0, // 날씨
  };
  const [diaryInput, setDiaryInput] = useState(initDiary);

  const handleChangeDiary = e => {
    const { name, value } = e.target;

    // 만약 이름이 condition 이면 숫자로, 아니면 그냥 값으로
    // const nowValue = name === "condition" ? parseInt(value) : value;
    const nowValue = parseInt(value) || value;

    setDiaryInput({ ...diaryInput, [name]: nowValue });
  };
  const handleDiarySubmit = e => {
    e.preventDefault();
    console.log("일기 데이터:", diaryInput);
    alert("일기가 저장되었습니다!");
    setDiaryInput({
      title: "",
      date: new Date().toISOString().split("T")[0],
      content: "",
      condition: 0,
      weather: 0,
    }); // 입력초기화
  };

  return (
    <div>
      <h1>TODO-로그인</h1>
      <LoginForm
        onSubmit={handleLoginSubmit}
        loginInput={loginInput}
        handleChange={handleChangeLogin}
      />
      <h2>TODO-일기장</h2>
      <DiaryForm
        onSubmit={handleDiarySubmit}
        diaryInput={diaryInput}
        handleChange={handleChangeDiary}
      />
    </div>
  );
};

export default DiarySample;
