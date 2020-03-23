import React, { FunctionComponent } from "react";
import styled from "styled-components";
import theme from "../theme";
import Speed from "./Speed";
import Accuracy from "./Accuracy";
import Timer from "./Timer";

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  position: relative;
  background-color: ${theme.whiteColor};
  padding: 2rem;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
`;

const Title = styled.h3``;

const Name = styled.input``;

interface IProp {
  closeModal: () => void;
  isTest: boolean;
  time: number;
  typeCnt: number;
  typeWrong: number[];
  submitHandler: (event: React.FormEvent) => void;
}

const Modal: FunctionComponent<IProp> = ({
  closeModal,
  isTest,
  time,
  typeCnt,
  typeWrong,
  submitHandler
}) => (
  <Container>
    <Content>
      <CloseButton onClick={closeModal}>X</CloseButton>
      <Title>{isTest ? "검정 결과" : "연습 결과"}</Title>
      <span>{isTest ? "검정 시간: " : "연습 시간: "}</span>
      <Timer time={isTest ? 300 - time : time} />
      <Speed
        isTest={isTest}
        time={time}
        typeCnt={typeCnt}
        typeWrong={typeWrong}
      />
      <Accuracy typeCnt={typeCnt} typeWrong={typeWrong} />
      <form onSubmit={submitHandler}>
        <span>이름을 입력하고 기록을 저장하세요!</span>
        <Name type="text" autoFocus={true} />
        <button>기록 저장</button>
      </form>
    </Content>
  </Container>
);

export default Modal;
