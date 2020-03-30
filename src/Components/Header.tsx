import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.header`
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 24px;
`;

const Title = styled.h1``;

const Header: React.FunctionComponent = () => (
  <Container>
    <Link to="/">
      <Title>Welcome to TyperZ!</Title>
    </Link>
    <Link to="/manager">문장 추가하기</Link>
  </Container>
);

export default Header;
