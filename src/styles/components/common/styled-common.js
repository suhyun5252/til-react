import styled from "@emotion/styled";

// 바로가기 영역 css-in-js
export const LinkDiv = styled.div`
  background-color: ${props => props.bc || "yellow"};
`;

// 제품 출력 css

export const GoodDetailDiv = styled.div`
  h3 {
    color: red;
  }
  img {
    width: 200px;
  }
`;
