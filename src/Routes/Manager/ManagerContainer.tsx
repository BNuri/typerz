import React, { Component } from "react";
import ManagerPresenter from "./ManagerPresenter";
import { quoteApi } from "../../api";
import { RouteComponentProps } from "react-router-dom";

interface IProps extends RouteComponentProps<any> {}

interface IState {
  title: string;
  writer: string;
  quote: string;
  loading: boolean;
}

class ManagerContainer extends Component<IProps, IState> {
  state: IState = {
    title: "",
    writer: "",
    quote: "",
    loading: false
  };

  render() {
    const { title, writer, quote, loading } = this.state;
    return (
      <ManagerPresenter
        title={title}
        writer={writer}
        quote={quote}
        loading={loading}
        onInputChange={this.onInputChange}
        onTextareaChange={this.onTextareaChange}
        onFormSubmit={this.onFormSubmit}
      />
    );
  }

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value } as any);
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
    this.setState({ loading: true });
    const { title, writer, quote } = this.state;
    const newQuote = { title, writer, quote };
    try {
      await quoteApi.createQuote(newQuote);
    } catch (error) {
      console.warn(error);
    } finally {
      this.setState({ loading: false });
      this.props.history.push({ pathname: "/home" });
    }
  };
}

export default ManagerContainer;
