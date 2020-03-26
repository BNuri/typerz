import React from "react";
import styled from "styled-components";
import ModalPortal from "../../Components/ModalPortal";
import Modal from "../../Components/Modal";
import Practice from "../../Components/Practice";

const Container = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1``;

const Writer = styled.h2``;

interface IPractice {
  typeCnt: number;
  typeWrong: number[];
  isTest: boolean;
  pageNum: number;
  pageTotal: number;
  time: number;
  result: { title: string; writer: string; quote: string[] };
  displayQuotes: string[];
  refs: HTMLInputElement[];
  modal: boolean;
  keyDownHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  keyPressHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  keyUpHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  closeModal: () => void;
  submitHandler: (event: React.FormEvent) => void;
}

const PracticePresenter: React.FunctionComponent<IPractice> = ({
  typeCnt,
  typeWrong,
  pageNum,
  pageTotal,
  isTest,
  time,
  result,
  displayQuotes,
  refs,
  modal,
  keyDownHandler,
  keyPressHandler,
  keyUpHandler,
  changeHandler,
  closeModal,
  submitHandler
}) => (
  <Container>
    <Title>{result.title}</Title>
    <Writer>{result.writer}</Writer>
    <Practice
      typeCnt={typeCnt}
      typeWrong={typeWrong}
      isTest={isTest}
      pageNum={pageNum}
      pageTotal={pageTotal}
      time={time}
      displayQuotes={displayQuotes}
      refs={refs}
      keyDownHandler={keyDownHandler}
      keyPressHandler={keyPressHandler}
      keyUpHandler={keyUpHandler}
      changeHandler={changeHandler}
    />
    {modal && (
      <ModalPortal>
        <Modal
          closeModal={closeModal}
          isTest={isTest}
          time={time}
          typeCnt={typeCnt}
          typeWrong={typeWrong}
          submitHandler={submitHandler}
        />
      </ModalPortal>
    )}
  </Container>
);

export default PracticePresenter;
