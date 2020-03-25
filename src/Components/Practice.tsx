import React from "react";
import styled from "styled-components";
import Timer from "./Timer";
import Speed from "./Speed";
import Accuracy from "./Accuracy";

const Container = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NumberContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

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

interface IProp {
  typeCnt: number;
  typeWrong: number[];
  isTest: boolean;
  pageNum: number;
  pageTotal: number;
  time: number;
  displayQuotes: string[];
  refs: HTMLInputElement[];
  keyDownHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  keyPressHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  keyUpHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Practice: React.FunctionComponent<IProp> = ({
  typeCnt,
  typeWrong,
  pageNum,
  pageTotal,
  isTest,
  time,
  displayQuotes,
  refs,
  keyDownHandler,
  keyPressHandler,
  keyUpHandler
}) => (
  <Container>
    <NumberContainer>
      <Timer time={time} />
      <Speed
        isTest={isTest}
        time={time}
        typeCnt={typeCnt}
        typeWrong={typeWrong}
      />
      <Accuracy typeCnt={typeCnt} typeWrong={typeWrong} />
    </NumberContainer>
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
            onKeyDown={keyDownHandler}
            onKeyPress={keyPressHandler}
            onKeyUp={keyUpHandler}
            onPaste={event => {
              event.preventDefault();
            }}
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
  </Container>
);

export default Practice;
