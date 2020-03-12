import React, { Component } from "react";
import ManagerPresenter from "./ManagerPresenter";
import { quoteApi } from "../../api";

interface IState {
  title: string;
  writer: string;
  quote: string;
}

class ManagerContainer extends Component<IState> {
  state: IState = {
    title: "",
    writer: "",
    quote: ""
  };

  render() {
    return (
      <ManagerPresenter
        title={this.state.title}
        writer={this.state.writer}
        quote={this.state.quote}
        onInputChange={this.onInputChange}
        onTextareaChange={this.onTextareaChange}
        onFormSubmit={this.onFormSubmit}
      />
    );
  }

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ quote: event.target.value });
  };

  onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.saveQuote();
    this.setState({ title: "", writer: "", quote: "" });
  };

  saveQuote = async () => {
    const { title, writer, quote } = this.state;
    const newQuote = { title, writer, quote };
    try {
      const data = await quoteApi.createQuote(newQuote);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
}

export default ManagerContainer;
