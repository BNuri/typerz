import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Accuracy: React.FunctionComponent<{
  typeCnt: number;
  typeWrong: number[];
}> = ({ typeCnt, typeWrong }) => (
  <Container>
    정확도:{" "}
    {typeCnt > 0
      ? Math.floor(
          ((typeCnt - typeWrong.reduce((first, next) => first + next, 0)) /
            typeCnt) *
            100
        )
      : 0}
    %
  </Container>
);

export default Accuracy;
