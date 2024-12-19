# Context API

- 용도
  : 웹 앱서비스의 기본적으로 관리할 자료보관 및 처리
  : 사용자 로그인 정보
  : 테마
  : 장바구니 등

- 특징
  : 개별 컴포넌트의 state 가 아니고, 앱 전체의 state 이다.
  : Context 로도 충분하지만, 좀 더 복잡한 데이터 처리 라이브러리 많음.
  : Redux(난이도 높음)
  : Recoil(난이도 낮고, 국내 활성화)
  : Zustand(난이도 낮고, 해외,국내 활성화)

## useState 로 state 관리를 해보자

- useState는 각각의 컴포넌트가 state를 관리하는 형식
- Drilling 으로 인한 문제점을 이해해 보자.

```jsx
import { useState } from "react";

const Header = ({ userInfo, setUserInfo }) => {
  return (
    <header>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>로고</p>
        <nav>
          {userInfo.userId === "" ? (
            <div>
              <button
                onClick={() => {
                  setUserInfo({
                    userId: "Lee",
                    userName: "suhyun",
                    userRole: "MEMBER",
                  });
                }}
              >
                로그인
              </button>
              <button onClick={() => {}}>회원가입</button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => {
                  setUserInfo({
                    userId: "",
                    userName: "",
                    userRole: "GUEST",
                  });
                }}
              >
                로그아웃
              </button>
              <button onClick={() => {}}>{userInfo.userName}님 정보수정</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
const Footer = ({ userInfo }) => {
  return <footer>하단{userInfo.userRole}</footer>;
};

const Main = ({ userInfo }) => {
  return (
    <main>
      {userInfo.userId === "" ? (
        <div>로그인을 하셔야 서비스를 이용합니다.</div>
      ) : (
        <div>
          <Charcher userInfo={userInfo} />
          <Friend userInfo={userInfo} />
          <Point userInfo={userInfo} />
          <Map userInfo={userInfo} />
          <FAQ userInfo={userInfo} />
        </div>
      )}
    </main>
  );
};

const Charcher = ({ userInfo }) => {
  return (
    <div>
      <div>{userInfo.userName}님 캐릭터 변경 서비스</div>
      <ChoiceCharacter userInfo={userInfo}>
        캐릭터 종류 선택 서비스
      </ChoiceCharacter>
    </div>
  );
};
const ChoiceCharacter = ({ userInfo }) => {
  return <div>{userInfo.userName}님 종류 선택 서비스</div>;
};
const Friend = ({ userInfo }) => {
  return <div>{userInfo.userName}님 친구관리 서비스</div>;
};
const Point = ({ userInfo }) => {
  return <div>{userInfo.userName}님 주포인트 구매 서비스</div>;
};
const Map = ({ userInfo }) => {
  return <div>{userInfo.userName}님 주변 지도안내 서비스</div>;
};
const FAQ = ({ userInfo }) => {
  return <div>{userInfo.userName}님 고객센터 QA 서비스</div>;
};

function App() {
  // useState 로 로그인한 사용자 정보 관리
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    userRole: "GUEST",
  });
  return (
    <div>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      <Main userInfo={userInfo} />
      <Footer userInfo={userInfo} />
    </div>
  );
}
export default App;
```

## Context API 활용

## 추천 폴더 구조

- `/src/contexts` 폴더 생성을 권장
  : context 는 `문맥` 이라고 합니다.
  : context 는 `일관성` 이라고 합니다.
  : context 는 `목표` 이라고 합니다.
  : context 는 `프로그램의 전체 목표를 이루기 위한 흐름` 이라고 합니다.

## 추천 파일

- `/src/contexts/` 에 파일생성
  : 예) ThemeContext.jsx, BucketContext.jsx, UserInfoContext.jsx
  : `/src/contexts/UserInfoContext.jsx` 생성

```jsx
import { createContext, useState } from "react";

export const UserInfoContext = createContext();
export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    userRole: "GUEST",
  });
  // return {값, 기능 목록등...}
  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {/* 지역범위 */}
      {children}
    </UserInfoContext.Provider>
  );
};
```

- App.jsx 반영

```jsx
import { useContext } from "react";
import { UserInfoContext, UserInfoProvider } from "./contexts/UserInfoContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  return (
    <header>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>로고</p>
        <nav>
          {userInfo.userId === "" ? (
            <div>
              <button
                onClick={() => {
                  setUserInfo({
                    userId: "hong",
                    userName: "길동",
                    userRole: "MEMBER",
                  });
                }}
              >
                로그인
              </button>
              <button onClick={() => {}}>회원가입</button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => {
                  setUserInfo({ userId: "", userName: "", userRole: "GUEST" });
                }}
              >
                로그아웃
              </button>
              <button onClick={() => {}}>{userInfo.userName}님 정보수정</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
const Footer = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <footer>하단 {userInfo.userRole}</footer>;
};
const Main = () => {
  const { userInfo } = useContext(UserInfoContext);
  return (
    <main>
      {userInfo.userId === "" ? (
        <div>로그인을 하셔야 서비스를 이용합니다.</div>
      ) : (
        <div>
          <Chracter />
          <Friend />
          <Point />
          <Map />
          <FAQ />
        </div>
      )}
    </main>
  );
};

const Chracter = () => {
  const { userInfo } = useContext(UserInfoContext);
  return (
    <div>
      <div>{userInfo.userName}님 캐릭터 변경 서비스</div>
      <ChoiceCharacter>캐릭터 종류 선택 서비스</ChoiceCharacter>
    </div>
  );
};
const ChoiceCharacter = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <div>{userInfo.userName}님 캐릭터 종류 선택 서비스</div>;
};

const Friend = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <div>{userInfo.userName}님 친구관리 서비스</div>;
};
const Point = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <div>{userInfo.userName}님 포인트 구매 서비스</div>;
};
const Map = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <div>{userInfo.userName}님 주변 서비스 지도안내 서비스</div>;
};
const FAQ = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <div>{userInfo.userName}님 고객센터 QA 서비스</div>;
};

function App() {
  return (
    <div>
      <UserInfoProvider>
        <Header />
        <Main />
        <Footer />
      </UserInfoProvider>
    </div>
  );
}
export default App;
```
