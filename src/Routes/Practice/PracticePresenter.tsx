import React from "react";
import styled from "styled-components";
import Timer from "../../Components/Timer";
import Speed from "../../Components/Speed";
import Accuracy from "../../Components/Accuracy";

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
  time: number;
  result: { title: string; writer: string; quote: string[] };
  displayQuotes: string[];
  refs: HTMLInputElement[];
  keyDownHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  keyUpHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PracticePresenter: React.FunctionComponent<IPractice> = ({
  typeCnt,
  typeWrong,
  pageNum,
  time,
  result,
  displayQuotes,
  refs,
  keyDownHandler,
  keyUpHandler,
  changeHandler
}) => (
  <Container>
    <Speed time={time} typeCnt={typeCnt} typeWrong={typeWrong} />
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
  </Container>
);

export default PracticePresenter;
