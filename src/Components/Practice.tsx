import React from "react";
import styled from "styled-components";
import Timer from "./Timer";
import Speed from "./Speed";
import Accuracy from "./Accuracy";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const NumberContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Quotes = styled.div`
  width: 850px;
  height: 400px;
`;

const Quote = styled.div`
  margin-top: 30px;
`;

const ComQuote = styled.div`
  height: 30px;
`;

const ComSpan = styled.span`
  position: relative;
  &.wrong: before {
    position: absolute;
    top: -15px;
    left: 3px;
    content: "";
    height: 8px;
    width: 12px;
    border-bottom: 3px solid red;
    border-left: 3px solid red;
    transform: rotate(-40deg);
  }
`;

const UserSpan = styled.span`
  position: relative;
  &.current: background-color: black;
`;

const Input = styled.input`
  width: 100%;
  border: none;
`;

const Input2 = styled.input`
  opacity: 0;
`;

const Page = styled.div``;

const PreventClick = styled.div`
  z-index: 1;
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  height: 100%;
  width: 100%;
`;

interface IProp {
  typeCnt: number;
  typeWrong: number[];
  isTest: boolean;
  pageNum: number;
  pageTotal: number;
  time: number;
  displayQuotes: string[];
  userQuotes: string[];
  refs: HTMLInputElement[];
  inputEl: React.RefObject<HTMLInputElement>;
  keyDownHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  keyUpHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Practice: React.FunctionComponent<IProp> = ({
  typeCnt,
  typeWrong,
  pageNum,
  pageTotal,
  isTest,
  time,
  displayQuotes,
  userQuotes,
  refs,
  inputEl,
  keyDownHandler,
  keyUpHandler,
  changeHandler,
}) => (
  <Container>
    <NumberContainer>
      <Timer time={time} isTest={isTest} />
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
                .map((word, i) => (
                  <>
                    <ComSpan className={`c${i}`}>{word}</ComSpan>
                    <UserSpan className={`u${i}`}>{userQuotes[index] && userQuotes[index][i] && userQuotes[index][i]}</UserSpan>
                  </>
                ))
            ) : (
              <ComSpan>↵</ComSpan>
            )}
          </ComQuote>
          {/* <Input
            type="text"
            maxLength={q.length}
            onKeyDown={keyDownHandler}
            onKeyUp={keyUpHandler}
            onChange={changeHandler}
            onPaste={(event) => {
              event.preventDefault();
            }}
            ref={(ref) => (refs[index] = ref!)}
            autoFocus={index === 0 ? true : false}
            spellCheck="false"
          ></Input> */}
        </Quote>
      ))}
    </Quotes>
    <Page>
      {pageNum} / {pageTotal}
    </Page>
    <PreventClick />
    <Input2 
      type="text" 
      onKeyDown={keyDownHandler}
      onKeyUp={keyUpHandler}
      onChange={changeHandler}
      onPaste={(event) => {
        event.preventDefault();
      }}
      autoFocus={true}
      spellCheck="false"
      ref={inputEl}
      />
  </Container>
);

export default Practice;
