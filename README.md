# React 변수 알아보기

## 1. JSX 변수 활용

- /src/components/Pop.jsx 생성
  : rafce (React Arrow Function Component Export)
- 1. 컴포넌트는 html을 배치한다.
- 2. 컴포넌트는 css를 배치한다.
- 3. 컴포넌트에 js를 활용한다.

### 1.1 JSX 에 변수 출력 하는 법

- 보간법 : {중괄호 표기법}

```jsx
const Pop = () => {
  const title = "팝업제목";
  const data = "팝업내용";
  return (
    <div>
      <h1>{title}</h1>
      <p>{data}</p>
    </div>
  );
};
export default Pop;
```

### 1.2 JSX 에 보간법을 이용한 css 출력

#### 1.2.1. 인라인 방식

- 복잡함
- style={ {속성명:속성값, 속성명:속성값...} }

```jsx
const Pop = () => {
  const title = "팝업제목";
  const data = "팝업내용";
  return (
    <div>
      <h1 style={{ color: "red", fontSize: "12px", background: "#eee" }}>
        {title}
      </h1>
      <p>{data}</p>
    </div>
  );
};

export default Pop;
```

#### 1.2.2 객체 리터럴 오브젝트 방식

```jsx
const Pop = () => {
  const title = "팝업제목";
  const data = "팝업내용";
  // css 에 역할을 하는 객체 리터럴은 변수명을 파스칼로 합니다.(관례상)
  const TitleStyle = {
    color: "red",
    fontSize: "12px",
    background: "#eee",
  };
  return (
    <div>
      <h1 style={TitleStyle}>{title}</h1>
      <p>{data}</p>
    </div>
  );
};

export default Pop;
```

#### 1.2.3 객체 리터럴 오브젝트는 가능하면 .js 파일에 export 형식 권장

- /src/component/pop.js (확장자 조심!)

```js
// pop.js
// css 에 역할을 하는 객체 리터럴은 변수명을 파스칼로 합니다.(관례상)
export const TitleStyle = {
  color: "red",
  fontSize: "12px",
  background: "#eee",
};

export const BodyStyle = {
  color: "green",
  fontSize: "10px",
};
```

```jsx
// Pop.jsx
import { BodyStyle, TitleStyle } from "./pop";

const Pop = () => {
  const title = "팝업제목";
  const data = "팝업내용";
  return (
    <div>
      <h1 style={TitleStyle}>{title}</h1>
      <p style={BodyStyle}>{data}</p>
    </div>
  );
};

export default Pop;
```

## 2. CSS-in-JS

- Styled Component
- Emotion (현재 유행함.)

### 2.1 Emotion 환경 구성

- `npm i @emotion/react @emotion/styled`
- `vscode-styled-components` 플러그인 설치

### 2.2 장점

- 태그만 보아도 어떤 내용을 보여주는지 알 수 있다.
- 별도의 컴포넌트.jsx 만들지 않아도 된다.
- CSS 도 함께 작성할 수 있다.

```jsx
import styled from "@emotion/styled";
import { BodyStyle, TitleStyle } from "./pop-style.js";

const Pop = () => {
  const title = "팝업제목";
  const data = "팝업내용";
  const PopupTitle = styled.h1`
    color: hotpink;
    font-size: 20px;
    text-align: center;
  `;

  const SlideDiv = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: green;
  `;
  const BannerDiv = styled.div``;
  const NoticeDiv = styled.div``;
  return (
    <div>
      <PopupTitle style={TitleStyle}>{title}</PopupTitle>
      <p style={BodyStyle}>{data}</p>

      <SlideDiv>슬라이드</SlideDiv>
      <BannerDiv>배너</BannerDiv>
      <NoticeDiv>공지사항</NoticeDiv>
    </div>
  );
};

export default Pop;
```

### 2.3 Props 전달 가능

- Emotion 에서 props 가 무엇인지 이해 후
- JSX 에서도 그래도 이해하면 된다.
- 장점은 응용범위가 넓고 재사용을 할 수 있다.
- JSX 컴포넌트 처럼 CSS 컴포넌트이다.
- 일반적으로 별도 js 파일로 모아서 팀이 활용한다.

#### 2.3.1 기본형

```js
const SlideDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
`;

// 사용
<SlideDiv>슬라이드</SlideDiv>;
```

#### 2.3.2 props 용

```js
const PopupTitle = styled.h1`
  color: rgb(255, 105, 180);
  font-size: ${props => props.size}px;
  text-align: center;
`;

// 사용
<PopupTitle style={TitleStyle}>{title}</PopupTitle>;
```

#### 2.3.3 props 기본값 적용한 값 추천

```js
const BannerDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.w || 100}px;
  height: ${props => props.h || 100}px;
  background-color: ${props => props.bg || "red"};
`;

//사용
<BannerDiv bg={"yellow"} w={200} h={200}>
  배너
</BannerDiv>
<BannerDiv bg={"orange"} w={50} h={50}>
  배너 2
</BannerDiv>
<BannerDiv>배너 3</BannerDiv>
```
