import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Span = styled.span``;

const Timer: React.FunctionComponent<{
  time: number;
  isTest: boolean;
}> = ({ time, isTest }) => (
  <Container>
    {isTest ? "검정 시간: " : "연습 시간: "}
    <Span>
      {time / 60 > 9 ? Math.floor(time / 60) : `0${Math.floor(time / 60)}`}:
      {time % 60 > 9 ? time % 60 : `0${time % 60}`}
    </Span>
  </Container>
);

export default Timer;
