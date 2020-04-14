import React from "react";
import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0%, 80%, 100% { 
    transform: scale(0);
  } 40% { 
    transform: scale(1.0);
  }
`;

const Container = styled.div`
  width: 70px;
  height: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  div:first-child {
    animation-delay: -0.3s;
  }
  div: nth-child(2) {
    animation-delay: -0.15s;
  }
`;

const Dot = styled.div`
  height: 8px;
  width: 8px;
  background-color: white;
  border-radius: 100%;
  display: inline-block;
  animation: ${bounce} 1.5s infinite ease-in-out both;
`;

const Spinner: React.FunctionComponent = () => (
  <Container>
    <Dot />
    <Dot />
    <Dot />
  </Container>
);

export default Spinner;
