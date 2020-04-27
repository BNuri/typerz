import React from "react";
import styled from "styled-components";
import Pingping from "./Pingping";

const Container = styled.div`
  height: calc(100vh - 150px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading: React.FunctionComponent = () => (
  <Container>
    <Pingping />
    <div className="nes-balloon from-left">Loading...</div>
  </Container>
);

export default Loading;
