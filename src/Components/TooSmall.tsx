import React from "react";
import styled from "styled-components";
import theme from "../theme";

const Container = styled.div`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${theme.whiteColor};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const TooSmall: React.FunctionComponent = () => 
  <Container>큰 화면에서 접속해 주세요!</Container>
;

export default TooSmall;
