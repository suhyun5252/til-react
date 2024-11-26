import Banner from "../components/banner/Banner";
import Footer from "../components/footer/footer";
import Header from "../components/header/Header";
import Notice from "../components/notice/Notice";
import { LinkDiv } from "../styles/components/common/styled-common";

import "../styles/pages/index-page.css";

function IndexPage() {
  return (
    <>
      <Header />
      <main className="main">
        <div className="slide">슬라이드</div>
        <div className="content">
          <Notice />
          <Banner />
          <LinkDiv bc={"pink"} className="link">
            바로가기
          </LinkDiv>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default IndexPage;
