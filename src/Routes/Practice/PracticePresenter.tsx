import React from "react";
import styled from "styled-components";
import ModalPortal from "../../Components/ModalPortal";
import Modal from "../../Components/Modal";
import Practice from "../../Components/Practice";

const Container = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H1 = styled.h1`
  font-size: 22px;
  padding-bottom: 50px;
`;

const QuoteContainer = styled.div`
  width: 1000px;
  height: 600px;
  text-align: left !important;
`;

const Title = styled.h1`
  font-size: 20px !important;
  margin: -2rem auto 1rem !important;
`;

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
    <H1>{isTest ? "타자 검정" : "타자 연습"}</H1>
    <QuoteContainer className="nes-container with-title is-rounded is-centered">
      <Title className="title">
        {result.writer ? result.title + " - " + result.writer : result.title}
      </Title>
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
    </QuoteContainer>
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
