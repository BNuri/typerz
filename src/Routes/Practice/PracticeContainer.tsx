import React, { Component } from "react";
import PracticePresenter from "./PracticePresenter";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { quoteApi, recordApi } from "../../api";

const PREVENT_KEYS = [
  9,
  17,
  18,
  19,
  20,
  21,
  25,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  45,
  46,
  91,
  92
];

const NO_COUNT_KEYS = [
  8,
  13,
  16,
  27,
  32,
  93,
  112,
  113,
  114,
  115,
  116,
  117,
  118,
  119,
  120,
  121,
  122,
  123,
  144,
  145
];

interface IProps extends RouteComponentProps<any> {}

interface IState {
  typeCnt: number;
  typeWrong: number[];
  currentLength: number;
  currentQuote: string;
  pageNum: number;
  pageTotal: number;
  endQuoteIndex: number;
  isTest: boolean;
  time: number;
  timer: number;
  result: { title: string; writer: string; quote: string[] };
  displayQuotes: string[];
  refs: HTMLInputElement[];
  inputIndex: number;
  modal: boolean;
}

class PracticeContainer extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const {
      location: { pathname }
    } = this.props;
    this.state = {
      typeCnt: 0,
      typeWrong: [],
      currentLength: 0,
      currentQuote: "",
      pageNum: 0,
      pageTotal: 0,
      endQuoteIndex: 0,
      isTest: pathname.includes("/test/"),
      time: 0,
      timer: 0,
      result: { title: "", writer: "", quote: [] },
      displayQuotes: [],
      refs: [],
      inputIndex: 0,
      modal: false
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    const { isTest } = this.state;
    if (id.isNull) {
      return push("/");
    }
    let result = null,
      pageTotal = 0,
      endQuoteIndex = 0;
    if (isTest) {
      this.setState({ time: 300 });
    }
    try {
      ({ data: result } = await quoteApi.getQuote(id));
      const { quote } = result;
      pageTotal = Math.ceil(quote.length / 5);
      endQuoteIndex = (quote.length % 5) - 1 < 0 ? 4 : quote.length % 5;
    } catch (error) {
      console.warn(error);
    } finally {
      this.setState({
        result,
        pageTotal,
        endQuoteIndex
      });
      this.sliceDisplayQuotes();
    }
  }

  componentWillUnmount() {
    this.setState({ modal: false });
    this.stopTimer();
  }

  sliceDisplayQuotes = () => {
    const {
      result: { quote }
    } = this.state;
    const { pageNum } = this.state;
    const displayQuotes = quote.slice(pageNum * 5, (pageNum + 1) * 5);
    this.setState({ displayQuotes, pageNum: this.state.pageNum + 1 });
  };

  render() {
    const {
      typeCnt,
      typeWrong,
      isTest,
      pageNum,
      pageTotal,
      result,
      displayQuotes,
      refs,
      time,
      modal
    } = this.state;
    return (
      <PracticePresenter
        typeCnt={typeCnt}
        typeWrong={typeWrong}
        isTest={isTest}
        pageNum={pageNum}
        pageTotal={pageTotal}
        result={result}
        displayQuotes={displayQuotes}
        refs={refs}
        time={time}
        modal={modal}
        keyDownHandler={this.keyDownHandler}
        keyUpHandler={this.keyUpHandler}
        changeHandler={this.changeHandler}
        closeModal={this.closeModal}
        submitHandler={this.submitHandler}
      />
    );
  }

  keyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // enter, 스페이스는 글 length와 같을때만 입력가능.
    if (event.defaultPrevented) {
      return;
    }
    if (event.keyCode === 13 || event.keyCode === 32) {
      const { maxLength } = event.currentTarget;
      if (maxLength === this.state.currentQuote.length) {
        //마지막 글자 오타검사
        event.preventDefault();
        const {
          currentTarget: { parentElement, value }
        } = event;
        const compareLength = value.length - 1;
        const comSpan = parentElement?.getElementsByClassName(
          `c${compareLength}`
        )[0];
        this.isWrong(value, compareLength, comSpan);
        if (
          this.state.pageNum === this.state.pageTotal &&
          this.state.inputIndex === this.state.endQuoteIndex
        ) {
          this.stopTyping();
        } else if (this.state.inputIndex === 4) {
          //다음장으로 이동합시다.
          this.goNextPage();
        } else {
          const nextIndex = this.state.inputIndex + 1;
          this.state.refs[nextIndex].focus();
          this.setState({ inputIndex: nextIndex, currentLength: 0 });
        }
      }
    } else if (event.keyCode === 27) {
      this.stopTyping();
    }
  };

  createTimer = () => {
    const timerId = setInterval(() => {
      this.setState({ time: this.state.time + (this.state.isTest ? -1 : 1) });
    }, 1000);
    this.setState({
      timer: timerId
    });
    if (this.state.isTest) {
      setTimeout(this.stopTyping, 300000);
    }
  };

  stopTimer = () => {
    clearInterval(this.state.timer);
  };

  stopTyping = () => {
    this.stopTimer();
    this.openModal();
  };

  keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.defaultPrevented) {
      return;
    }
    if (PREVENT_KEYS.includes(event.keyCode)) {
      event.preventDefault();
      return;
    } else if (!NO_COUNT_KEYS.includes(event.keyCode)) {
      this.setState({ typeCnt: this.state.typeCnt + 1 });
    }
    const {
      currentTarget: { value }
    } = event;
    this.setState({ currentQuote: value });
    if (this.state.timer === 0) {
      this.createTimer();
    }
  };

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, parentElement }
    } = event;
    //length 달라질 때마다 갱신
    if (this.state.currentLength < value.length) {
      if (value.length === 1) return;
      const compareLength = value.length - 2;
      const comSpan = parentElement?.getElementsByClassName(
        `c${compareLength}`
      )[0];
      this.isWrong(value, compareLength, comSpan);
    } else if (this.state.currentLength > value.length) {
      const comSpan = parentElement?.getElementsByClassName(
        `c${value.length}`
      )[0];
      this.deleteWrong(comSpan);
      this.setState({ currentLength: value.length });
    }
  };

  //오타 수정
  deleteWrong = (comSpan?: Element) => {
    const comClass = comSpan?.className;
    if (comClass?.includes("wrong")) {
      this.setState({
        typeWrong: this.state.typeWrong.filter(
          (w, i) => i !== this.state.typeWrong.length - 1
        )
      });
      comSpan?.classList.remove("wrong");
    }
  };

  //오타 탐지
  isWrong = (value: string, compareLength: number, comSpan?: Element) => {
    if (!comSpan) return;
    const userChar = value[compareLength];
    const comClass = comSpan.className;
    const comChar = comSpan.textContent;
    if (!comChar) return;
    const stroke = this.getStroke(comChar);
    if (comChar !== userChar && !comClass?.includes("wrong")) {
      this.setState({ typeWrong: [...this.state.typeWrong, stroke] });
      comSpan?.classList.add("wrong");
    }
    this.setState({ currentLength: compareLength + 1 });
  };

  clickHandler = (event: React.SyntheticEvent<HTMLInputElement>) => {
    console.log(event);
    //클릭 막기
  };

  goNextPage = () => {
    this.sliceDisplayQuotes();
    this.state.refs.map(ref => (ref.value = ""));
    this.state.refs[0].focus();
    this.setState({ inputIndex: 0, currentLength: 0 });
    document
      .querySelectorAll(".wrong")
      .forEach(span => span.classList.remove("wrong"));
  };

  getStroke = (kor?: string) => {
    if (!kor) return 0;
    const uni: number = kor.charCodeAt(0);
    const GA = 44032;
    const NEJA = [2, 3, 5, 6, 9, 10, 11, 12, 13, 14, 15, 18, 20];
    if (uni >= 12593 && uni <= 12643) {
      return 1;
    } else if (uni >= GA && uni <= 55203) {
      const res = (uni - GA) % 28;
      if (res === 0) {
        return 2;
      } else if (NEJA.includes(res)) {
        return 4;
      }
      return 3;
    }
    return 1;
  };

  openModal = () => {
    this.setState({ modal: true });
  };

  closeModal = () => {
    this.props.history.push("/");
  };

  createRecord = async (creator: string) => {
    const { typeCnt, typeWrong, time, isTest } = this.state;
    const kpm = Math.floor(
      (typeCnt - typeWrong.reduce((first, next) => first + next, 0)) /
        ((isTest ? 300 - time : time) / 60)
    );
    const accuracy = Math.floor(
      ((typeCnt - typeWrong.reduce((first, next) => first + next, 0)) /
        typeCnt) *
        100
    );
    const newRecord = { kpm, accuracy, creator };
    const {
      match: {
        params: { id }
      }
    } = this.props;
    try {
      const { data: myRecord } = await recordApi.createRecords(id, newRecord);
      this.props.history.push({
        pathname: `/ranking/${id}`,
        state: { myRanking: myRecord._id }
      });
    } catch (error) {
      console.warn(error);
    }
  };

  submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const { currentTarget } = event;
    const name = currentTarget.getElementsByTagName("input")[0].value;
    this.createRecord(name);
  };
}

export default withRouter(PracticeContainer);
