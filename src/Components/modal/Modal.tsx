import React, { FunctionComponent } from "react";
import styled from "styled-components";
import theme from "../../theme";
import Speed from "../Speed";
import Accuracy from "../Accuracy";
import Timer from "../Timer";
import Button from "../Button";

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
  font-size: 20px;
  z-index: 2;
`;

const Content = styled.div`
  position: relative;
  background-color: ${theme.whiteColor};
  padding: 2rem 4rem;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  padding: 5px;
`;

const Title = styled.h3`
  font-size: 22px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const ResultContainer = styled.div`
  height: 80px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  text-align: center;
  padding-bottom: 10px;
`;

const Name = styled.input``;

interface IProp {
  closeModal: () => void;
  isTest: boolean;
  time: number;
  typeCnt: number;
  typeWrong: number[];
  loader: boolean;
  submitHandler: (event: React.FormEvent) => void;
}

const Modal: FunctionComponent<IProp> = ({
  closeModal,
  isTest,
  time,
  typeCnt,
  typeWrong,
  loader,
  submitHandler,
}) => (
  <Container>
    <Content>
      <CloseButton onClick={closeModal}>
        <i className="nes-icon close is-small" />
      </CloseButton>
      <Title>{isTest ? "검정 결과" : "연습 결과"}</Title>
      <ResultContainer>
        <Timer time={isTest ? 300 - time : time} isTest={isTest} />
        <Speed
          isTest={isTest}
          time={time}
          typeCnt={typeCnt}
          typeWrong={typeWrong}
        />
        <Accuracy typeCnt={typeCnt} typeWrong={typeWrong} />
      </ResultContainer>
      <Form onSubmit={submitHandler}>
        <Label htmlFor="name">이름을 입력하고 기록을 저장하세요!</Label>
        <div className="nes-field is-inline">
          <Name
            type="text"
            className="nes-input"
            autoFocus={true}
            id="name"
            maxLength={10}
            required={true}
          />
          <Button loader={loader} value="기록 저장" />
        </div>
      </Form>
    </Content>
  </Container>
);

export default Modal;
