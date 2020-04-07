import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import img from "../assets/images/logo.png";

const Container = styled.header`
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 24px;
`;

const Logo = styled.div`
  margin-right: 10px;
  height: 100px;
  width: 100px;
  background-image: url(${img});
  background-size: cover;
  &:active {
    transform: translateY(3px);
  }
`;

const Header: React.FunctionComponent = () => (
  <Container>
    <Link to="/">
      <Logo />
    </Link>
    <Link to="/manager">문장 추가하기</Link>
  </Container>
);

export default Header;
