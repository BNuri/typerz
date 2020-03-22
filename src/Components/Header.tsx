import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.header`
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
`;

const Title = styled.h1``;

const Header: React.FunctionComponent = () => (
  <Container>
    <Link to="/">
      <Title>Welcome to TyperZ!</Title>
    </Link>
    <Link to="/practice/5e68a033c984b61bc799472d">타자 연습</Link>
    <Link to="/manager">문장 추가하기</Link>
  </Container>
);

export default Header;
