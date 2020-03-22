import React, { Component } from "react";
import styled from "styled-components";
import { recordApi, quoteApi } from "../api";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";

const Container = styled.div`
  width: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1``;

const Writer = styled.h2``;

const STitle = styled.h3``;

const RankingUl = styled.ul`
  padding-top: 20px;
  width: 600px;
`;

const RankingLi = styled.li`
  width: 100%;
  padding: 10px 0px;
  display: flex;
  justify-content: space-around;
  &.myRanking {
    background-color: blue;
    color: white;
  }
`;

const Index = styled.span``;

const Name = styled.span``;

const Kpm = styled.span`
  &:before {
    content: "타속";
    padding: 5px 7px;
    margin-right: 5px;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    border-radius: 20px;
    font-size: 16px;
  }
`;

const Accuracy = styled.span`
  &:before {
    content: "정확도";
    padding: 5px 7px;
    margin-right: 5px;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    border-radius: 20px;
    font-size: 16px;
  }
`;

interface IProps
  extends RouteComponentProps<
    { id: string },
    StaticContext,
    { myRanking: string }
  > {}

interface IState {
  title: string;
  writer: string;
  myRanking: string;
  records: { _id: string; creator: string; kpm: number; accuracy: number }[];
}

class Ranking extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      title: "",
      writer: "",
      myRanking: "",
      records: []
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    if (!id) {
      return push("/");
    }
    let title = "",
      writer = "",
      mine = "",
      records = null;
    try {
      const { data: quote } = await quoteApi.getQuote(id);
      title = quote.title;
      writer = quote.writer;
      ({ data: records } = await recordApi.getRecordsById(id));
      const {
        location: { state }
      } = this.props;
      mine = state.myRanking ? state.myRanking : "";
    } catch (error) {
      console.warn(error);
    } finally {
      this.setState({ title, writer, myRanking: mine, records });
    }
  }

  render() {
    return (
      <Container>
        <Title>{this.state.title}</Title>
        <Writer>{this.state.writer}</Writer>
        <STitle>명예의 전당</STitle>
        <RankingUl>
          {this.state.records.map((ranking, index) => (
            <RankingLi
              className={
                this.state.myRanking === ranking._id ? "myRanking" : ""
              }
            >
              <Index>{index + 1}</Index>
              <Name>{ranking.creator}</Name>
              <Kpm>{ranking.kpm}</Kpm>
              <Accuracy>{ranking.accuracy}</Accuracy>
            </RankingLi>
          ))}
        </RankingUl>
      </Container>
    );
  }
}

export default withRouter(Ranking);
