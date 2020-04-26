import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loader";

const Container = styled.main`
  width: 100%;
  height: calc(100vh - 100px);
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const CheckContainer = styled.section`
  padding-top: 30px;
`;

const Label = styled.label`
  padding: 0px 10px;
`;

const Input = styled.input``;

const Quotes = styled.ul`
  width: 500px;
  max-height: 500px;
  margin: 50px 4px 4px 4px !important;
  overflow-y: auto;
`;

const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

const Quote = styled.li`
  padding: 13px 10px;
  padding-left: 15px;
  position: relative;
  &:hover:before {
    position: absolute;
    top: 13px;
    left: -10px;
    content: "";
    width: 2px;
    height: 2px;
    color: #212529;
    box-shadow: 2px 2px, 4px 2px, 2px 4px, 4px 4px, 6px 4px, 8px 4px, 2px 6px,
      4px 6px, 6px 6px, 8px 6px, 10px 6px, 2px 8px, 4px 8px, 6px 8px, 8px 8px,
      10px 8px, 12px 8px, 2px 10px, 4px 10px, 6px 10px, 8px 10px, 10px 10px,
      2px 12px, 4px 12px, 6px 12px, 8px 12px, 2px 14px, 4px 14px;
    animation: ${blink} 1s infinite steps(1);
  }
`;

interface IProps {
  quotes: { _id: string; title: string }[];
  isTest: boolean;
  loading: boolean;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HomePresenter: React.FunctionComponent<IProps> = ({
  quotes,
  isTest,
  loading,
  changeHandler,
}) =>
  loading ? (
    <Loading />
  ) : (
    <Container>
      <CheckContainer className="nes-container is-rounded">
        <Label>
          <Input
            type="radio"
            className="nes-radio"
            name="radio"
            value="practice"
            onChange={changeHandler}
            checked={isTest === false}
          />
          <span>타자 연습</span>
        </Label>
        <Label>
          <Input
            type="radio"
            className="nes-radio"
            name="radio"
            value="test"
            onChange={changeHandler}
            checked={isTest === true}
          />
          <span>타자 검정</span>
        </Label>
      </CheckContainer>
      <Quotes className="nes-container is-rounded">
        {quotes &&
          quotes.map((quote) => (
            <Quote key={quote._id}>
              <Link
                to={`/${isTest ? "test" : "practice"}/${quote._id}`}
                key={quote._id}
              >
                {quote.title.length > 20 ? quote.title + "..." : quote.title}
              </Link>
            </Quote>
          ))}
      </Quotes>
    </Container>
  );

export default HomePresenter;
