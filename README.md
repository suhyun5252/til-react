# useCallback

- useCallback() : 함수를 리랜더링 시 다시 정의하지 않고 보관해둠

## 기본예제

```jsx
import { useState, useCallback } from "react";

function App() {
  const [count, setCount] = useState(0);
  // 리랜더링 즉, state가 바뀌면 함수도 다시 만들어짐.
  // 이를 다시 정의하지 않도록 useCallback 활용
  const add = useCallback(() => {
    // 함수의 기능
    setCount(prev => prev + 1);
  }, []);
  return (
    <div>
      <h1>카운팅 : {count}</h1>
      <button onClick={add}>증가</button>
    </div>
  );
}
export default App;
```

## 응용예제

- `컴포넌트는 props 가 전달되면 리랜더링 한다.`
- `props가 변화가 없으면 리랜더링 안한다.`

```jsx
import { useState, useCallback } from "react";

function App() {
  // 숫자 state
  const [count, setCount] = useState(0);
  // 내용 state
  const [text, setText] = useState("");
  // 숫자 증가 함수를 메모해둠.
  // 만약 count 가 변하면 리랜더링이 됨.
  // 만약 text 가 변하면 리랜더링 됨.
  // 문제점) useCallback을 활용하지 않으면 ? text, count 가 변하면 함수가 다시 만들어짐
  const add = useCallback(() => {
    console.log("함수가 다시 만들어질까?");
    setCount(prev => prev + 1);
  }, [count]);
  return (
    <div>
      <h1>부모 컴포넌트</h1>
      <Child add={add} />
      <div>카운팅 : {count}</div>
      <input
        value={text}
        onChange={e => {
          setText(e.target.value);
        }}
      />
    </div>
  );
}
export default App;

function Child({ add }) {
  console.log("자식 컴포넌트 리랜더링");
  return (
    <div>
      자식 컴포넌트
      <button onClick={add}>증가</button>
    </div>
  );
}
```

- 의존성 배열의 이해
- 1번: useMemo 는 결과값 보관인데 필요하다면 배열처리의 결과를 보관하는곳에 활용, 그외는 사용금지

```jsx
import { useCallback, useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  // query 가 변경이 된다면 그때 함수를 다시 정의하겠다.
  const handleSearch = useCallback(() => {
    console.log("query를 처리하는 새로운 함수 생성", query);
  }, [query]);
  return (
    <div>
      <h1>state 변경시 함수 재실행</h1>
      <input
        value={query}
        onChange={e => {
          setQuery(e.target.value);
        }}
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
}
export default App;
```
