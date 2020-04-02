import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  position: fixed;
  bottom: 10px;
  text-align: center;
  opacity: 0.5;
  font-size: 16px;
`;

const Footer: React.FunctionComponent = () => (
  <Container>ⓒ 2020 by BNURI | 문의: luckmon05@naver.com</Container>
);

export default Footer;
