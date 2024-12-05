# react-router-dom

- 리액트에는 http 경로를 이용한 화면이동이 없다.
- 통상 http 경로를 `라우터`라고 한다.
- `라우터` 를 사용하려면 `react-router-dom` 을 사용해야한다.

## 1. 참고사항

- 링크

```html
<a href="라우터">이동</a>
```

- form의 action

```html
<form action="라우터">...</form>
```

## 2. URI의 구성

- `http://localhost:3000/todo/login?id=hong&pass=123`

### 2.1 Protocal(네트워킹을 위한 약속)

- `http://`

```
HTTP (HyperText Transfer Protocol)
 : 웹 브라우저와 서버 간의 데이터 전송.

HTTPS (HTTP Secure)
 : HTTP에 보안(SSL/TLS)을 추가한 프로토콜.

FTP (File Transfer Protocol)
 : 파일 전송에 사용.

SMTP (Simple Mail Transfer Protocol)
 : 이메일 전송.

IMAP (Internet Message Access Protocol)
 : 이메일 수신(서버에서 관리).

POP3 (Post Office Protocol 3)
 : 이메일 수신(다운로드 후 로컬 관리).

DNS (Domain Name System)
 : 도메인 이름을 IP 주소로 변환.

DHCP (Dynamic Host Configuration Protocol)
 : 동적 IP 주소 할당.
```

### 2.2 도메인 (Domain)

-`localhost`

- 일반적으로 대화에서 `홈페이지 주소`로 이해
- 가끔 코딩할때 `도메인`을 지켜서 `업무를 식별`해서 개발하기
- `DNS`는 `Domain Name System` 로서 IP 에 글자이름 부여

### 2.3 Port 번호

-`:3000`

- `80` port : 기본 포트 (도메인으로 접속시 자동연결)
  : 80은 안적으면 작동

### 2.4 Path

- 물음표 앞에까지
- 경로 `/todo/login?`
- 경로 `/member/login?`

### 2.5 Query String

- `?~~~~~`
- 질의문 (질문하고 결과를 받겠다)

## 3. URI를 이용해서 React 에서 활용

- `react-router-dom`
- (https://www.npmjs.com/package/react-router-dom)
- (https://reactrouter.com/start/framework/route-module)
- 설치 `npm i react-router-dom`

## 4. 활용전에 먼저 고민

- Site map 을 고민해보자

```
http://localhost:3000/ : 첫페이지
http://localhost:3000/about : 소개
http://localhost:3000/about/mission : 미션
http://localhost:3000/about/team : 팀


http://localhost:3000/service : 서비스

http://localhost:3000/blog : 블로그
http://localhost:3000/blog/design : 디자인
http://localhost:3000/blog/design/1 : REST_API
http://localhost:3000/blog/design/detail?id=1 : query-string(쇼핑몰이나 sns)


http://localhost:3000/blog/market : 마켓
http://localhost:3000/blog/news : 뉴스

http://localhost:3000/portfolio : 포트폴리오
http://localhost:3000/contact : 연락하기

```

## 5. Route 에 맞게 pages 폴더 구성하기

- `http://localhost:3000/` Root 페이지 또는 라우터
  : `src/pages/Index.jsx` 를 말합니다.

- `http://localhost:3000/about`
  : `src/pages/about/Index.jsx` 를 말합니다.

- `http://localhost:3000/about/team`
  : `src/pages/about/Team.jsx` 를 말합니다.

- `http://localhost:3000/service`
  : `src/pages/service/Index.jsx` 를 말합니다.

- `http://localhost:3000/service/now`
  : `src/pages/service/Now.jsx` 를 말합니다.

- `http://localhost:3000/blog`
  : `src/pages/blog/Index.jsx` 를 말합니다.

- `http://localhost:3000/blog/1`
  : `src/pages/blog/Detail.jsx` 를 말합니다.

- `http://localhost:3000/blog/list?id=1&cate=design`
  : `src/pages/blog/List.jsx` 를 말합니다.

## 6. Route 적용은 App.js 에 하기로 해요.

- 아래를 지켜주셔야 합니다.
- `as` 를 확인하세요.
- `Router > Routes > Route`

```jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// as 는 alias 라는 문법으로 별칭을 지음
function App() {
  return (
    <Router>
      <Routes>
        <Route />
        <Route />
        <Route />
      </Routes>
    </Router>
  );
}

export default App;
```

### 6.1. `기본`으로 작업하신다면

```jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// as 는 alias 라는 문법으로 별칭을 지음
import HomePage from "./pages/Index";
import AboutPage from "./pages/about/Index";
import TeamPage from "./pages/about/Team";
import ServicePage from "./pages/service/Index";
import NowPage from "./pages/service/Now";
import BlogPage from "./pages/blog/Index";
import BlogDetailPage from "./pages/blog/Detail";
import BlogListPage from "./pages/blog/List";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/about/team" element={<TeamPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/service/now" element={<NowPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/1" element={<BlogDetailPage />} />
        <Route path="/blog/list?id=1&cate=design" element={<BlogListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
```

### 6.2 중첩(Nested) 라우터

- `일반적`으로 활용
- `<Route index component={컴포넌트}>`index 주의

```jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//  as 는 alias 라는 문법으로 별칭을 지음
import HomePage from "./pages/Index.jsx";
import AboutPage from "./pages/about/Index.jsx";
import TeamPage from "./pages/about/Team.jsx";
import ServicePage from "./pages/service/Index.jsx";
import NowPage from "./pages/service/Now.jsx";
import BlogPage from "./pages/blog/Index.jsx";
import BlogDetailPage from "./pages/blog/Detail.jsx";
import BlogListPage from "./pages/blog/List.jsx";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/about">
          <Route index element={<AboutPage />} />
          <Route path="team" element={<TeamPage />} />
        </Route>

        <Route path="/service">
          <Route index element={<ServicePage />}></Route>
          <Route path="now" element={<NowPage />} />
        </Route>

        <Route path="/blog">
          <Route index element={<BlogPage />}></Route>
          <Route path="1" element={<BlogDetailPage />} />
          <Route path="list?id=1&cate=design" element={<BlogListPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
```

### 6.3 존재하지 않은 path로 접근시 처리법

- path는 `*`. 제일 하단에 배치 권장
- `<Route path="*" element={<NotFound/>}></Route>`

## 7. 라우터에 `Params` 전달하기

- `Param` 단어를 반드시 기억하기
- 백엔드 연동시 필수 내용
- `패스/param`
- `http://localhost:5173/good/10` : 10이 `param`
- `http://localhost:5173/blog/21` : 21이 `param`

- 보낼때

```jsx
<Route path=":id" element={<BlogDetailPage />} />
```

-받을때

```jsx
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  return (
    <div>
      /blog/<b>{id}</b> 블로그 상세 페이지(RestAPI 방식)
    </div>
  );
};

export default Detail;
```

## 8. 쿼리 스트링 활용하기

- `?` 는 `Search`

```jsx
import { useSearchParams } from "react-router-dom";

function List() {
  // Search Params 데이터 내용 출력하기
  const [searchParams, setSearchParams] = useSearchParams();

  // 개별 데이터 뜯기
  const id = searchParams.get("id");
  const cate = searchParams.get("cate");

  return (
    <div>
      /blog/list?id={id}&cate={cate} 블러그 목록 (queryString방식)
    </div>
  );
}
```

### 9. 공통 레이아웃 적용하기

```
<header></header>
<main>URI 에 따라서 변한다.</main>
<footer></footer>
```

### 9.1 기본 Link 이해

```jsx
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
//  as 는 alias 라는 문법으로 별칭을 지음
import HomePage from "./pages/Index.jsx";
import AboutPage from "./pages/about/Index.jsx";
import TeamPage from "./pages/about/Team.jsx";
import ServicePage from "./pages/service/Index.jsx";
import NowPage from "./pages/service/Now.jsx";
import BlogPage from "./pages/blog/Index.jsx";
import BlogDetailPage from "./pages/blog/Detail.jsx";
import BlogListPage from "./pages/blog/List.jsx";
import NotFound from "./pages/404.jsx";
const App = () => {
  return (
    <Router>
      <header>
        <Link to="/">🔷 Home</Link>
        <Link to="/about">🔶 about</Link>
        <Link to="/about/team">🔸 about/team</Link>
        <Link to="/service">🔶 service</Link>
        <Link to="/service/now">🔸 service/now</Link>
        <Link to="/blog">🔶 blog</Link>
        <Link to="/blog/1">🔸 blog/:id</Link>
        <Link to="/blog/iist?id=1&cate=design">🔸 blog/list?쿼리스트링</Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/about">
            <Route index element={<AboutPage />} />
            <Route path="team" element={<TeamPage />} />
          </Route>

          <Route path="/service">
            <Route index element={<ServicePage />}></Route>
            <Route path="now" element={<NowPage />} />
          </Route>

          <Route path="/blog">
            <Route index element={<BlogPage />}></Route>
            <Route path=":id" element={<BlogDetailPage />} />
            {/* <Route path="list?id=1&cate=design" element={<BlogListPage />} /> */}
            <Route path="list" element={<BlogListPage />} />
          </Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </main>
      <footer>하단</footer>
    </Router>
  );
};
export default App;
```

### 9.2 component 로 Header.jsx 만들기

```jsx
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">🔷 Home</Link>
      <Link to="/about">🔶 about</Link>
      <Link to="/about/team">🔸 about/team</Link>
      <Link to="/service">🔶 service</Link>
      <Link to="/service/now">🔸 service/now</Link>
      <Link to="/blog">🔶 blog</Link>
      <Link to="/blog/1">🔸 blog/:id</Link>
      <Link to="/blog/iist?id=1&cate=design">🔸 blog/list?쿼리스트링</Link>
    </header>
  );
};
export default Header;
```

### 9.3 component 로 Footer.jsx 만들기

## 10. 페이지에 Props 전달하기

```jsx
<Route path="/" element={<HomePage title={"좋은회사"} year={2024} />} />
```

```jsx
// 목(Mock Data) 데이터  더미 데이터
const BlogDatas = [
  { id: 1, title: "블로그 1", cate: "design", content: "디자인 관련글 1" },
  { id: 2, title: "블로그 2", cate: "market", content: "마케팅 관련글" },
];
--------------------------------------------
<Route index element={<BlogPage data={BlogDatas} />}></Route>;
```

## 11. 페이지에 Props 중에 children 전달하기

```jsx
<Footer>
  <p>Copyright 2024 By Lee</p>
  {isMember ? <p>로그인 하셨네요.</p> : <p>로그인 전입니다.</p>}
</Footer>
```

```jsx
const Footer = ({ children }) => {
  return <footer>{children}</footer>;
};
export default Footer;
```

## 12. react-router-dom 의 `Outlet` 이해

- `Router` 를 이용해서 페이지의 `레이아웃`을 유지하고
- `Router 의 Outlet` 장소에 `path`에 따라서 `컴포넌트 출력`
- 반드시 중첩 `Router`여야 가능
- 샘플 예제

```
1. layout 용 페이지를 만든다
2. 처음에 index 컴포넌트가 보인다
3. 그래서 사용자가 블로그에 목록을 보고있다.
4. 목록 중 상세보기를 클릭하면
5. 레이아웃에 상세내용 페이지가 출력된다.
```

- /src/page/blog/Layout.jsx

```jsx
<Route path="/blog" element={<Layout />}>
  <Route path=":id" element={<BlogDetailPage />} />
  <Route index element={<BlogPage data={BlogDatas} />} />
  {/* <Route path="list?id=1&cate=design" element={<BlogListPage />} /> */}
  <Route path="list" element={<BlogListPage />} />
</Route>
```

## 13. `Outlet` 과 `Children`의 비교

- 공통점
  : jsx를 전달한다.

  ```jsx
  <Footer>
    <p>Copyright 2024 By Lee</p>
    {isMember ? <p>로그인 하셨네요.</p> : <p>로그인 전입니다.</p>}
  </Footer>
  ```

- 차이점
  : Children 은 props로 전달 (태그의 내용처럼)
  : `Outlet` 은 `중첩 Route`에 전달

  ```jsx
  <Route path="/blog" element={<Layout />}>
    <Route />
    <Route />
  </Route>
  ```

## 14. 패스 및 Params 를 실시간 생성하기

## 14.1. `문자열` 또는 `백틱`으로 생성

```js
- const path = "/service"
- const path = `/service`
- const path = `/service/${id}`
// SearchParams의 예
- const path = `/service/?age=${10}&pass=${12345}`
```

## 14.2. SearchParams 를 만들기

```js
const queryStr = createSearchParams({ 키: 값, 키: 값 }).toString();
const path = queryStr;

const queryStr = createSearchParams({
  name: "길동",
  age: 100,
}).toString();
```

### 14.3 `Link to=경로` 말고 `js로 강제 이동하기`

```js
const navigate = useNavigate();
const path = `/service`;
navigate("path");
```

### 14.4 현재 `path` 를 알고싶을 때

```js
import { useLocation } from "react-router-dom";

const {pathname, search, state} = useLocation();

console.log(location)

// 담겨진 결과
// http://localhost:5173/blog?hi=5
{
    "pathname": "/blog",
    "search": "?hi=5",
    "hash": "",
    "state": null,
    "key": "default"
}

```

### 14.5 `state` 사용자 모르게 라우터에 전달하기

- `Link` 로는 어렵다.
- `useNavigate()` 이용

```js
import {useNavigate } from "react-router-dom";
-----
const navigate = useNavigate();
const path = `/service`;
const 숨긴정보 = {
  memo : "제품페이지에서 왔어요.",
  good : "제품 1번을 보고 있었어요",
  favarite : "제품 1에 관심이 많네요"
}
navigate(
  {
   pathname: "/blog",
   search: "?hi=5",
  },
  {state : { 숨긴정보 }}
);
```
