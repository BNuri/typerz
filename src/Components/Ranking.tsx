import React, { Component } from "react";
import styled from "styled-components";
import { recordApi, quoteApi } from "../api";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";

const Container = styled.main`
  width: 100%;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const STitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 22px !important;
  margin: -2rem auto 1rem !important;
`;

const Content = styled.div`
  width: 650px;
  padding-top: 20px;
  margin: 40px 4px 4px 4px !important;
`;

const Table = styled.table`
  width: 100%;
  text-align: center;
`;

const Tr = styled.tr`
  height: 40px;
  width: 100%;
  padding: 10px 0px;
  & td {
    vertical-align: middle;
  }
  &.myRanking {
    background-color: blue;
    color: white;
  }
  &.belowTen {
    position: absolute;
    bottom: -100px;
    left: 0px;
    display: flex;
    padding: 10px 25px;
  }
`;

const Index = styled.td`
  width: 5%;
`;

const Name = styled.td`
  width: 45%;
`;

const Kpm = styled.td`
  width: 25%;
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

const Accuracy = styled.td`
  width: 25%;
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
        <STitle>
          <i className="nes-icon trophy is-medium" />
          명예의 전당
          <i className="nes-icon trophy is-medium" />
        </STitle>
        <Content className="nes-container with-title is-centered is-rounded">
          <Title className="title">{this.state.title}</Title>
          <Table>
            {this.state.records.map((ranking, index) =>
              index < 10 ? (
                <Tr
                  className={
                    this.state.myRanking === ranking._id ? "myRanking" : ""
                  }
                >
                  <Index>{index + 1}</Index>
                  <Name>{ranking.creator}</Name>
                  <Kpm>{ranking.kpm}</Kpm>
                  <Accuracy>{ranking.accuracy}</Accuracy>
                </Tr>
              ) : this.state.myRanking === ranking._id ? (
                <Tr className="myRanking belowTen">
                  <Index>{index + 1}</Index>
                  <Name>{ranking.creator}</Name>
                  <Kpm>{ranking.kpm}</Kpm>
                  <Accuracy>{ranking.accuracy}</Accuracy>
                </Tr>
              ) : (
                ""
              )
            )}
          </Table>
        </Content>
      </Container>
    );
  }
}

export default withRouter(Ranking);
