import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Form = styled.form``;

const Title = styled.input``;

const Writer = styled.input``;

const Quote = styled.textarea``;

const Button = styled.button``;

interface IManager {
  title: string;
  writer: string;
  quote: string;
  onFormSubmit: (event: React.FormEvent) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTextareaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ManagerPresenter: React.FunctionComponent<IManager> = ({
  title,
  writer,
  quote,
  onInputChange,
  onTextareaChange,
  onFormSubmit
}) => (
  <Container>
    <Form onSubmit={onFormSubmit}>
      <Title
        type="text"
        placeholder="제목"
        name="title"
        value={title}
        onChange={onInputChange}
      />
      <Writer
        type="text"
        placeholder="작가"
        name="writer"
        value={writer}
        onChange={onInputChange}
      />
      <Quote
        placeholder="내용을 입력하세요."
        name="quote"
        value={quote}
        onChange={onTextareaChange}
      />
      <Button>등록</Button>
    </Form>
  </Container>
);

export default ManagerPresenter;
