import React from "react";
import styled from "styled-components";

const Container = styled.footer`
  width: 100%;
  position: fixed;
  bottom: 10px;
  display: flex;
  justify-content: center;
  opacity: 0.5;
  font-size: 16px;
`;

const Address = styled.address`
  margin-left: 5px;
`;

const Footer: React.FunctionComponent = () => (
  <Container>
    <span>ⓒ {new Date().getFullYear()} by BNURI | </span>
    <Address>
      <a href="mailto:luckmon05@naver.com">luckmon05@naver.com</a>
    </Address>
  </Container>
);

export default Footer;
