# 커스텀훅(custom hook)

## hook 이란?

- hook은 우리나라말로 `걸다` 또는 `덩달아서 실행한다`는 의미
- hook은 영어로는 `갈고리`
- 리액트 컴포넌트의 state 와 lifecycle에 따라서 같이 실행되어지는 함수

- useContext, useState, useEffect, useRef, useMemo, useCallback, ... 200여개
- 개발자가 리액트 빌트인 hook 처럼 만든 hook을 커스텀 훅이라고 합니다.
- 예) useLocation, useNavigation
- 누가나 hook을 필요로 한 만큼 만들어서 사용할 수 있다.

## hook을 만들 때 유의사항

- 동일한 기능을 만약 여러번 사용한다면 함수를 만들어 볼 생각을 하자.
- 이 함수가 컴포넌트에 사용이 된다면 ? hook 으로 만들어볼 생각을 하자.
- `/src/hooks` 라는 폴더에 모아두겠다고 생각해 보자.
- 파일명은 반드시 `use(소문자)훅명.js` 생성해야 리액트에서 hook 처럼 사용하게 해준다.

## hook을 사용시 유의사항

- 리엑트 훅이든, 커스텀 훅이든 반드시 `컴포넌트 내부에 배치`되어야 한다.
- 리엑트 훅이든, 사용자 정의 훅이든 `if문, for문, 조건문 등의 내부에서는 사용할 수 없다.`
- 예외로 컴포넌트가 아닌 곳에서도 리액트 훅을 사용할 수 있는 것은 Custom Hook 이다.

## 기본 예제

- App.jsx

```jsx
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>카운트 : {count}</h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        증가
      </button>
    </div>
  );
}
export default App;
```

- App.jsx

```jsx
import { useCount } from "./hooks/useCount";

function App() {
  const { count, add, minus } = useCount();
  return (
    <div>
      <h1>카운트 : {count}</h1>
      <button onClick={() => add()}>증가</button>
      <button onClick={() => minus()}>감소</button>
    </div>
  );
}
export default App;
```

- /src/hooks/useCount.js

```js
import { useState } from "react";

export function useCount(initvalue = 0) {
  const [count, setCount] = useState(initvalue);
  const add = () => {
    setCount(count + 1);
  };
  const minus = () => {
    setCount(count - 1);
  };
  const reset = () => {
    setCount(initvalue);
  };
  return { count, add, minus, reset };
}
```

### 실제 커스텀 훅 생성 과정

- 동일한 기능의 반복 사용이라면? custom hook 고민해보자
  -custom hook 을 생성시 많은 고민을 해야 합니다.
- src/hooks/useAxios.js

```js
// 일반적으로 FE 개발자는 백엔드와 API 통신을 할거다
// 일반적으로 FE 개발자는 주소와, 자료를 전달하고ㅛ 결과를 받을 것이다.
// 일반적으로 FE 개발자는 get, post, put, delete 를 사용할 것이다.
// 내가 API 통신을 편리하게 사용할 수 있는 Hook을 만들어서
// 팀의 API 통신 컨벤션을 제공하겠다.

import axios from "axios";
import { useState, useEffect } from "react";

// 일반적 사용을 조사
// const { data, error, loading } = useAxios("주소", "자료", "get");
// const { data, error, loading } = useAxios("주소", "자료", "GET");
// const { data, error, loading } = useAxios("주소", { 자료 }, "post");
// const { data, error, loading } = useAxios("주소", null, "put");
// const { data, error, loading } = useAxios("주소", 1, "delete");

// export function useAxios(_url, _payload = null, _method = "get" , _jwt=false) {}
export function useAxios(_url, _payload = null, _method = "get") {
  // api 회신 결과
  const [data, setData] = useState(null);
  // api 회신 오류 결과
  const [error, setError] = useState(null);
  // api 호출 진행중
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // 로딩 진행중
    setLoading(true);
    // API 연동 실행
    const fetchAPI = async () => {
      try {
        let res;
        // 대문자로 통일함
        let method = _method.toUpperCase(_method);
        switch (method) {
          // axios.get("주소?id=1&num=2&cate=과일")
          case "GET":
            res = await axios.get(_url);
            break;
          // axios.post("주소", {객체} )
          case "POST":
            res = await axios.post(_url, _payload);
            break;
          // axios.put("주소", {객체} )
          case "PUT":
            res = await axios.put(_url, _payload);
            break;
          // axios.delete("주소?id=1&num=2&cate=과일")
          case "DELETE":
            res = await axios.delete(_url);
            break;
          default:
            throw new Error(`${_method} 잘못 보내셨네요.`);
        }
        setData(res.data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    // 만들어둔 fetch 실행
    fetchAPI();
    // 로딩 완료
    setLoading(false);
  }, [_url, _payload, _method]);
  return { data, error, loading };
}
```

- /src/hooks/useLogin.js

```js
// 로그인에 관련된 코드를 모아둔다.
// 컴포넌트는 아니지만, use 훔들을 사용했다.
// 일반 함수에는 use 훅들을 사용 못 한다.
// 그렇다면 custom hook 만들어서 활용한다.

import axios from "axios";
import { useState } from "react";

export const useLogin = () => {
  // 로그인 상태
  const [isLogin, setIsLogin] = useState(false);

  // 사용자 정보
  const [data, setData] = useState(null);

  // 서버 에러
  const [error, setError] = useState(null);

  // 서버 연결중
  const [loading, setLoading] = useState(false);

  //   로그인 함수
  const login = async (id, pw) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/login", { id: id, pw: pw });
      setData(res.data);
      setIsLogin(true);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return { data, loading, error, isLogin, login };
};
```

- /src/hooks/useComponent

```jsx
import { useEffect, useState } from "react";

// 화면의 리사이즈를 체크하는 용도의 customHook
const useComponent = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};
export default useComponent;
```

## 커스텀 훅 사용

- App.jsx

```jsx
import { useAxios } from "./hooks/useAxios";
import useComponent from "./hooks/useComponent";
import { useCount } from "./hooks/useCount";
import { useLogin } from "./hooks/useLogin";

function App() {
  // 커스텀 훅 사용법
  const { count, add, minus } = useCount(100);
  const { data, error, loading } = useAxios();
  const { data, loading, error, isLogin, login } = useLogin();
  const windowSize = useComponent();

  return (
    <div>
      <h1>카운트 : {count}</h1>
      <button onClick={() => add()}>증가</button>
      <button onClick={() => minus()}>감소</button>
    </div>
  );
}
export default App;
```
