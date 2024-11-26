import styled from "@emotion/styled";
import { BodyStyle, TitleStyle } from "./pop-style.js";

const PopupTitle = styled.h1`
  color: rgb(255, 105, 180);
  font-size: ${props => props.size || 20}px;
  text-align: center;
`;
const SlideDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
`;
const BannerDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.w || 300}px;
  height: ${props => props.h || 300}px;
  background-color: ${props => props.bg || "#eee"};
`;
const NoticeDiv = styled.div``;

const Pop = () => {
  const title = "팝업제목";
  const data = "팝업내용";

  return (
    <div>
      <PopupTitle style={TitleStyle} size={20}>
        {title}
      </PopupTitle>
      <p style={BodyStyle}>{data}</p>

      <SlideDiv>슬라이드</SlideDiv>
      <BannerDiv bg={"yellow"} w={200} h={200}>
        배너1
      </BannerDiv>
      <BannerDiv bg={"red"} w={100} h={100}>
        배너2
      </BannerDiv>
      <BannerDiv>배너3</BannerDiv>
      <NoticeDiv>공지사항</NoticeDiv>
    </div>
  );
};

export default Pop;
