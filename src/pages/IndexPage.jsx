import Footer from "../components/Footer";
import Header from "../components/header";

import "./IndexPage.css";

function IndexPage() {
  return (
    <>
      <Header />
      <main>
        <div className="layout">
          <div>공지사항/갤러리</div>
          <div>배너</div>
          <div>바로가기</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
// 외부에서 활용하도록
export default IndexPage;
