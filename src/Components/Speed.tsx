import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Speed: React.FunctionComponent<{
  time: number;
  typeCnt: number;
  typeWrong: number[];
}> = ({ time, typeCnt, typeWrong }) => (
  <Container>
    타수:
    {time > 0
      ? Math.floor(
          (typeCnt - typeWrong.reduce((first, next) => first + next, 0)) /
            (time / 60)
        )
      : 0}
  </Container>
);

export default Speed;
