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
  92,
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
  145,
];

interface IProps extends RouteComponentProps<any> {}

interface IState {
  typeCnt: number;
  typeWrong: number[];
  currentValue: string;
  currentIndex: number;
  currentQuote: string;
  pageNum: number;
  pageTotal: number;
  endInputIndex: number;
  isTest: boolean;
  time: number;
  timer: number;
  focuser: number;
  result: { title: string; writer: string; quote: string[] };
  displayQuotes: string[];
  refs: HTMLInputElement[];
  inputIndex: number;
  modal: boolean;
  loading: boolean;
  loader: boolean;
}

class PracticeContainer extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const {
      location: { pathname },
    } = this.props;
    this.state = {
      typeCnt: 0,
      typeWrong: [],
      currentValue: "",
      currentIndex: 0,
      currentQuote: "",
      pageNum: 0,
      pageTotal: 0,
      endInputIndex: 0,
      isTest: pathname.includes("/test/"),
      time: 0,
      timer: 0,
      focuser: 0,
      result: { title: "", writer: "", quote: [] },
      displayQuotes: [],
      refs: [],
      inputIndex: 0,
      modal: false,
      loading: true,
      loader: false,
    };
  }

  sliceCurrentQuotes = () => {
    const {
      result: { quote },
      pageNum,
    } = this.state;
    const displayQuotes = quote.slice(pageNum * 5, (pageNum + 1) * 5);
    this.setState({ displayQuotes, pageNum: this.state.pageNum + 1 });
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isTest } = this.state;
    if (id.isNull) {
      return push("/");
    }
    let result = null,
      pageTotal = 0,
      endInputIndex = 0;
    try {
      ({ data: result } = await quoteApi.getQuote(id));
      const { quote } = result;
      pageTotal = Math.ceil(quote.length / 5);
      endInputIndex = (quote.length % 5) - 1 < 0 ? 4 : (quote.length % 5) - 1;
    } catch (error) {
      console.warn(error);
    } finally {
      this.setState({
        result,
        pageTotal,
        endInputIndex,
        loading: false,
        time: isTest ? 300 : 0,
      });
      this.sliceCurrentQuotes();
    }
  }

  componentWillUnmount() {
    this.setState({ modal: false });
    this.stopTimer();
  }

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
      modal,
      loading,
      loader,
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
        loading={loading}
        loader={loader}
      />
    );
  }

  goNextLine = () => {
    const { inputIndex } = this.state;
    const nextIndex = inputIndex + 1;
    this.state.refs[nextIndex].focus();
    this.setState({ inputIndex: nextIndex, currentIndex: 0 });
  };

  goNextPage = () => {
    this.sliceCurrentQuotes();
    this.state.refs.map((ref) => (ref.value = ""));
    this.state.refs[0].focus();
    this.setState({ inputIndex: 0, currentIndex: 0 });
    document
      .querySelectorAll(".wrong")
      .forEach((span) => span.classList.remove("wrong"));
  };

  goNextStep = () => {
    const { pageNum, pageTotal, inputIndex, endInputIndex } = this.state;
    if (pageNum === pageTotal && inputIndex === endInputIndex) {
      this.stopTyping();
    } else if (inputIndex === 4) {
      this.goNextPage();
    } else {
      this.goNextLine();
    }
  };

  createFocuser = () => {
    const focuserId = setInterval(() => {
      this.state.refs[this.state.inputIndex].focus();
    }, 1000);
    this.setState({ focuser: focuserId });
  };

  createTimer = () => {
    const timerId = setInterval(() => {
      this.setState({ time: this.state.time + (this.state.isTest ? -1 : 1) });
    }, 1000);
    this.setState({
      timer: timerId,
    });
    if (this.state.isTest) {
      setTimeout(this.stopTyping, 300000);
    }
    this.createFocuser();
  };

  stopTimer = () => {
    clearInterval(this.state.timer);
    clearInterval(this.state.focuser);
  };

  openModal = () => {
    this.setState({ modal: true });
  };

  closeModal = () => {
    this.props.history.push("/");
  };

  stopTyping = () => {
    this.stopTimer();
    this.openModal();
  };

  keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = event;
    const { value } = event.currentTarget;
    if (PREVENT_KEYS.includes(keyCode)) {
      event.preventDefault();
      return;
    } else if (!NO_COUNT_KEYS.includes(keyCode)) {
      this.setState({ typeCnt: this.state.typeCnt + 1 });
    }
    this.setState({ currentValue: value });
    if (this.state.timer === 0) {
      this.createTimer();
    }
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

  isWrong = (value: string, compareIndex: number, comSpan?: Element) => {
    if (!comSpan) return;
    const userChar = value[compareIndex];
    const comClass = comSpan.className;
    const comChar = comSpan.textContent;
    if (!comChar) return;
    const stroke = this.getStroke(comChar);
    if (comChar !== userChar && !comClass?.includes("wrong")) {
      this.setState({ typeWrong: [...this.state.typeWrong, stroke] });
      comSpan?.classList.add("wrong");
    }
  };

  deleteWrong = (comSpan?: Element) => {
    const comClass = comSpan?.className;
    if (comClass?.includes("wrong")) {
      this.setState({
        typeWrong: this.state.typeWrong.filter(
          (w, i) => i !== this.state.typeWrong.length - 1
        ),
      });
      comSpan?.classList.remove("wrong");
    }
  };

  keyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { maxLength, parentElement } = event.currentTarget;
    const { currentValue } = this.state;
    if (event.keyCode === 13 || event.keyCode === 32) {
      if (maxLength === currentValue.length) {
        let compareIndex = currentValue.length - 1;
        const comSpan = parentElement?.getElementsByClassName(
          `c${compareIndex}`
        )[0];
        this.isWrong(currentValue, compareIndex, comSpan);
        this.setState({ currentIndex: 0, currentValue: "" });
        this.goNextStep();
      }
    } else if (event.keyCode === 27) {
      //****************************************지울것
      this.stopTyping();
    }
  };

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, parentElement } = event.currentTarget;
    const { currentValue, currentIndex } = this.state;
    const compareIndex = value.length - 2;
    if (currentIndex < value.length) {
      if (value.length === 1) return;
      const comSpan = parentElement?.getElementsByClassName(
        `c${compareIndex}`
      )[0];
      this.isWrong(value, compareIndex, comSpan);
      this.setState({ currentIndex: compareIndex + 1 });
    } else {
      const comSpan = parentElement?.getElementsByClassName(
        `c${currentValue.length - 1}`
      )[0];
      this.deleteWrong(comSpan);
      this.setState({
        currentIndex: currentValue.length - 1,
      });
    }
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
        params: { id },
      },
    } = this.props;
    try {
      const { data: myRecord } = await recordApi.createRecords(id, newRecord);
      this.props.history.push({
        pathname: `/ranking/${id}`,
        state: { myRanking: myRecord._id },
      });
    } catch (error) {
      console.warn(error);
    }
  };

  submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    this.setState({ loader: true });
    const { currentTarget } = event;
    const name = currentTarget.getElementsByTagName("input")[0].value;
    this.createRecord(name);
  };
}

export default withRouter(PracticeContainer);
