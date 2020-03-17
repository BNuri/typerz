import React, { ReactSVG } from "react";
import styled from "styled-components";

const Container = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h3``;

const Writer = styled.h5``;

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

interface IPractice {
  typeCnt: number;
  typeWrong: number[];
  pageNum: number;
  isTest: boolean;
  result: { title: string; writer: string; quote: string[] };
  displayQuotes: string[];
  keyDownHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  keyUpHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  refs: HTMLInputElement[];
}

const PracticePresenter: React.FunctionComponent<IPractice> = ({
  typeCnt,
  typeWrong,
  pageNum,
  isTest,
  result,
  displayQuotes,
  keyDownHandler,
  keyUpHandler,
  changeHandler,
  refs
}) => (
  <Container>
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
          ></Input>
        </Quote>
      ))}
    </Quotes>
  </Container>
);

export default PracticePresenter;
