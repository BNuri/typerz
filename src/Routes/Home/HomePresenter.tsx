import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1``;

const Checkbox = styled.section``;

const Label = styled.label`
  padding: 0px 10px;
`;

const Input = styled.input``;

const Quotes = styled.ul``;

const Quote = styled.li``;

interface IProps {
  quotes: { _id: string; title: string }[];
  isTest: boolean;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HomePresenter: React.FunctionComponent<IProps> = ({
  quotes,
  isTest,
  changeHandler
}) => (
  <Container>
    <Title>타자 연습</Title>
    <Checkbox className="nes-container is-rounded">
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
    </Checkbox>
    <Quotes>
      {quotes.map(quote => (
        <Link to={`/${isTest ? "test" : "practice"}/${quote._id}`}>
          <Quote key={quote._id}>{quote.title}</Quote>
        </Link>
      ))}
    </Quotes>
  </Container>
);

export default HomePresenter;
