import React from "react";
import styled from "styled-components";
import Timer from "../../Components/Timer";
import Speed from "../../Components/Speed";
import Accuracy from "../../Components/Accuracy";
import ModalPortal from "../../Components/ModalPortal";
import Modal from "../../Components/Modal";

const Container = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1``;

const Writer = styled.h2``;

const Quotes = styled.div`
  width: 800px;
`;

const Quote = styled.div`
  margin-top: 20px;
`;

const ComQuote = styled.div`
  height: 30px;
`;

const Span = styled.span`
  &.wrong {
    background-color: red;
  }
`;

const Input = styled.input`
  width: 100%;
  border: none;
`;

const Page = styled.span``;

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
  keyUpHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  closeModal: () => void;
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
  keyUpHandler,
  changeHandler,
  closeModal
}) => (
  <Container>
    <Speed
      isTest={isTest}
      time={time}
      typeCnt={typeCnt}
      typeWrong={typeWrong}
    />
    <Accuracy typeCnt={typeCnt} typeWrong={typeWrong} />
    <Timer time={time} />
    <Title>{result.title}</Title>
    <Writer>{result.writer}</Writer>
    <Quotes>
      {displayQuotes.map((q, index) => (
        <Quote>
          <ComQuote key={`cq${index}`}>
            {q && q.length > 0 ? (
              q
                .split("")
                .map((word, index) => (
                  <Span className={`c${index}`}>{word}</Span>
                ))
            ) : (
              <Span>↵</Span>
            )}
          </ComQuote>
          <Input
            type="text"
            maxLength={q.length}
            onKeyUp={keyUpHandler}
            onKeyDown={keyDownHandler}
            onChange={changeHandler}
            ref={ref => (refs[index] = ref!)}
            autoFocus={index === 0 ? true : false}
            spellCheck="false"
          ></Input>
        </Quote>
      ))}
    </Quotes>
    <Page>
      {pageNum} / {pageTotal}
    </Page>
    {modal && (
      <ModalPortal>
        <Modal
          closeModal={closeModal}
          isTest={isTest}
          time={time}
          typeCnt={typeCnt}
          typeWrong={typeWrong}
        />
      </ModalPortal>
    )}
  </Container>
);

export default PracticePresenter;
