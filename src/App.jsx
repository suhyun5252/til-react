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
import NotFound from "./pages/404.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { useState } from "react";
import Layout from "./pages/blog/Layout.jsx";

// 목(Mock Data) 데이터
const BlogDatas = [
  { id: 1, title: "블로그 1", cate: "design", content: "디자인 관련글 1" },
  { id: 2, title: "블로그 2", cate: "market", content: "마케팅 관련글" },
  { id: 3, title: "블로그 3", cate: "design", content: "디자인 관련글 2" },
  { id: 4, title: "블로그 4", cate: "idea", content: "아이디어 관련글" },
  { id: 5, title: "블로그 5", cate: "design", content: "디자인 관련글 3" },
];

const App = () => {
  const [isMember, setIsMember] = useState(false);
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={<HomePage title={"좋은회사"} year={2024} />}
          />

          <Route path="/about">
            <Route index element={<AboutPage />} />
            <Route path="team" element={<TeamPage />} />
          </Route>

          <Route path="/service">
            <Route index element={<ServicePage />}></Route>
            <Route path="now" element={<NowPage />} />
          </Route>

          <Route path="/blog" element={<Layout />}>
            <Route index element={<BlogPage data={BlogDatas} />}></Route>
            <Route path=":id" element={<BlogDetailPage />} />
            {/* <Route path="list?id=1&cate=design" element={<BlogListPage />} /> */}
            <Route path="list" element={<BlogListPage />} />
          </Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </main>
      <Footer>
        <p>Copyright 2024 By Lee</p>
        {isMember ? <p>로그인 하셨네요.</p> : <p>로그인 전입니다.</p>}
      </Footer>
    </Router>
  );
};
export default App;
