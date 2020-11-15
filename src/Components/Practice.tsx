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
  display: flex;
  justify-content: start;
  align-items: center;
  height: 30px;
  margin-top: 30px;
`;

const Char = styled.div`
  position: relative;
  height: 30px;
  width: 20px;
`;

const ComSpan = styled.span`
  position: relatvie;
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
  position: absolute;
  bottom: -15px;
  left: 0;
  &.current { 
    background-color: black;
    color: white;
  }
`;

const Input2 = styled.input`
  opacity: 0;
`;

const Page = styled.div``;

interface IProp {
  typeCnt: number;
  typeWrong: number[];
  isTest: boolean;
  pageNum: number;
  pageTotal: number;
  time: number;
  displayQuotes: string[];
  userQuotes: string[];
  inputEl: React.RefObject<HTMLInputElement>;
  inputIndex: number;
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
  inputEl,
  inputIndex,
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
          <Quote key={`cq${index}`}>
            {q && q.length > 0 ? (
              q
                .split("")
                .map((word, i) => (
                  <Char>
                    <ComSpan className={`c${index}-${i}`}>{word}</ComSpan>
                    <UserSpan className={`u${index}-${i}`}>{userQuotes[index] && userQuotes[index][i] && userQuotes[index][i]}</UserSpan>
                  </Char>
                ))
            ) : (
              <ComSpan>↵</ComSpan>
            )}
          </Quote>
      ))}
    </Quotes>
    <Page>
      {pageNum} / {pageTotal}
    </Page>
    <Input2 
      type="text" 
      maxLength={displayQuotes[inputIndex]?.length}
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
