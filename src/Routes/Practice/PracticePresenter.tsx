import React from "react";
import styled from "styled-components";
import ModalPortal from "../../Components/modal/ModalPortal";
import Modal from "../../Components/modal/Modal";
import Practice from "../../Components/Practice";
import Loader from "../../Components/Loader";
import Title from "../../Components/Title";

const Container = styled.main`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuoteContainer = styled.section`
  width: 1000px;
  height: 600px;
  text-align: left !important;
`;

const QTitle = styled.h2`
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
  userQuotes: string[];
  refs: HTMLInputElement[];
  inputEl: React.RefObject<HTMLInputElement>;
  modal: boolean;
  loading: boolean;
  loader: boolean;
  keyDownHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
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
  userQuotes,
  refs,
  inputEl,
  modal,
  loading,
  loader,
  keyDownHandler,
  keyUpHandler,
  changeHandler,
  closeModal,
  submitHandler,
}) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <Title title={isTest ? "타자 검정" : "타자 연습"} />
      <QuoteContainer className="nes-container with-title is-rounded is-centered">
        <QTitle className="title">
          {result.writer ? result.title + " - " + result.writer : result.title}
        </QTitle>
        <Practice
          typeCnt={typeCnt}
          typeWrong={typeWrong}
          isTest={isTest}
          pageNum={pageNum}
          pageTotal={pageTotal}
          time={time}
          displayQuotes={displayQuotes}
          userQuotes={userQuotes}
          refs={refs}
          inputEl={inputEl}
          keyDownHandler={keyDownHandler}
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
            loader={loader}
            submitHandler={submitHandler}
          />
        </ModalPortal>
      )}
    </Container>
  );

export default PracticePresenter;
