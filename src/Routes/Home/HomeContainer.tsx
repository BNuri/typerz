import React, { Component } from "react";
import HomePresenter from "./HomePresenter";
import { quoteApi } from "../../api";
import { RouteComponentProps } from "react-router-dom";

interface IProps extends RouteComponentProps<any> {}

interface IState {
  quotes: { _id: string; title: string }[];
  isTest: boolean;
  loading: boolean;
}

class HomeContainer extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      quotes: [],
      isTest: false,
      loading: true
    };
  }

  async componentDidMount() {
    let quotes;
    try {
      ({ data: quotes } = await quoteApi.getQuotes());
    } catch (error) {
      console.warn(error);
    } finally {
      this.setState({ quotes, loading: false });
    }
  }

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ isTest: value === "test" ? true : false });
  };

  render() {
    const { quotes, isTest, loading } = this.state;
    return (
      <HomePresenter
        quotes={quotes}
        isTest={isTest}
        loading={loading}
        changeHandler={this.changeHandler}
      />
    );
  }
}

export default HomeContainer;
