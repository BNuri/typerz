import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import img from "../assets/images/logo.png";

const Container = styled.header`
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 24px;
`;

const Logo = styled.img`
  margin-right: 10px;
  height: 100px;
  width: 100px;
  &:active {
    transform: translateY(3px);
  }
`;

const Header: React.FunctionComponent = () => (
  <Container>
    <Link to="/">
      <Logo src={img} alt="타이퍼즈" />
    </Link>
    <Link to="/manager" title="문장 추가">
      문장 추가하기
    </Link>
  </Container>
);

export default Header;
