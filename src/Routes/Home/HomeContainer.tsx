import React, { Component } from "react";
import HomePresenter from "./HomePresenter";
import { quoteApi } from "../../api";
import { RouteComponentProps } from "react-router-dom";

interface IProps extends RouteComponentProps<any> {}

interface IState {
  quotes: { _id: string; title: string }[];
  isTest: boolean;
}

class HomeContainer extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      quotes: [],
      isTest: false
    };
  }

  async componentDidMount() {
    try {
      const { data: quotes } = await quoteApi.getQuotes();
      this.setState({ quotes });
    } catch (error) {
      console.warn(error);
    }
  }

  render() {
    const { quotes, isTest } = this.state;
    return (
      <HomePresenter
        quotes={quotes}
        isTest={isTest}
        changeHandler={this.changeHandler}
      />
    );
  }

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ isTest: value === "test" ? true : false });
  };
}

export default HomeContainer;
