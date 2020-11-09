import React, { useState, useEffect } from "react";
import HomePresenter from "./HomePresenter";
import { quoteApi } from "../../api";
import { RouteComponentProps } from "react-router-dom";

interface IProps extends RouteComponentProps<any> {}

interface IState {
  quotes: { _id: string; title: string }[];
  isTest: boolean;
  loading: boolean;
}

const HomeContainer: React.FunctionComponent<IProps> = () => {
  const [state, setState] = useState<IState>({
    quotes: [],
    isTest: false,
    loading: true
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setState({ ...state, isTest: value === "test" ? true : false });
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data: quotes } = await quoteApi.getQuotes();
      setState({ ...state, quotes, loading: false });
    }
    fetchData();
  }, [state]);


  return (
    <HomePresenter
      quotes={state.quotes}
      isTest={state.isTest}
      loading={state.loading}
      changeHandler={changeHandler}
    />
  );
}

export default HomeContainer;
