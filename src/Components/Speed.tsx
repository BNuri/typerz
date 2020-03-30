import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Speed: React.FunctionComponent<{
  isTest: boolean;
  time: number;
  typeCnt: number;
  typeWrong: number[];
}> = ({ isTest, time, typeCnt, typeWrong }) => (
  <Container>
    타속:{" "}
    {(isTest ? 300 - time : time) > 0
      ? Math.floor(
          (typeCnt - typeWrong.reduce((first, next) => first + next, 0)) /
            ((isTest ? 300 - time : time) / 60)
        )
      : 0}
    타
  </Container>
);

export default Speed;
