import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Title from "../../Components/Title";

const Container = styled.main`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Field = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  margin-left: 5px;
`;

const Required = styled.span`
  padding-left: 5px;
  color: red;
`;

const Form = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
`;

const QTitle = styled.input``;

const Writer = styled.input``;

const Quote = styled.textarea`
  height: 300px;
`;

const Button = styled.button`
  align-self: center;
`;

interface IManager {
  title: string;
  writer: string;
  quote: string;
  loading: boolean;
  onFormSubmit: (event: React.FormEvent) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTextareaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ManagerPresenter: React.FunctionComponent<IManager> = ({
  title,
  writer,
  quote,
  loading,
  onInputChange,
  onTextareaChange,
  onFormSubmit,
}) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <Title title="문장 추가하기" />
      <Form onSubmit={onFormSubmit}>
        <Field className="nes-field">
          <Label htmlFor="title">
            제목<Required>*</Required>
          </Label>
          <QTitle
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onInputChange}
            className="nes-input"
            required={true}
            maxLength={20}
          />
        </Field>
        <Field className="nes-field">
          <Label htmlFor="writer">작가</Label>
          <Writer
            type="text"
            id="writer"
            name="writer"
            value={writer}
            onChange={onInputChange}
            className="nes-input"
            maxLength={20}
          />
        </Field>
        <Field className="nes-field">
          <Label htmlFor="quote">
            내용을 입력하세요.<Required>*</Required>
          </Label>
          <Quote
            id="quote"
            name="quote"
            value={quote}
            onChange={onTextareaChange}
            className="nes-textarea"
            required={true}
          />
        </Field>
        <Button className="nes-btn is-warning">등록</Button>
      </Form>
    </Container>
  );

export default ManagerPresenter;
