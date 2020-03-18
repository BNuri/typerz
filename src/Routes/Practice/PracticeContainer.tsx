import React, { Component } from "react";
import PracticePresenter from "./PracticePresenter";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { quoteApi } from "../../api";

const PREVENT_KEYS = [
  9,
  17,
  18,
  19,
  20,
  21,
  25,
  27,
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
  pageNum: number;
  isTest: boolean;
  time: number;
  timer: number;
  result: { title: string; writer: string; quote: string[] };
  displayQuotes: string[];
  refs: HTMLInputElement[];
  inputIndex: number;
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
      pageNum: 0,
      isTest: pathname.includes("/test/"),
      time: 0,
      timer: 0,
      result: { title: "", writer: "", quote: [] },
      displayQuotes: [],
      refs: [],
      inputIndex: 0
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
    let result = null;
    if (isTest) {
      this.setState({ time: 300 });
    }
    try {
      ({ data: result } = await quoteApi.getQuote(id));
      const { quote } = result;
      const quoteArr = this.splitQuote(quote);
      quoteArr.unshift(result.title, result.writer);
      result.quote = quoteArr;
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ result });
      this.sliceDisplayQuotes();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  splitByLength = (quote: string) => {
    let length = quote.length;
    let cnt = length / 40;
    let arr: string[] = [];
    for (let i = 0; i < cnt; i++) {
      const sub = quote.substr(i * 40, 40);
      arr.push(sub[0] === " " ? sub.replace(" ", "") : sub);
    }
    return arr;
  };

  splitQuote = (quote: string) => {
    const RE = /(\r\n|\n|\r)/gm;
    let quoteArr: string[] = quote.split(RE);
    quoteArr = quoteArr.filter(quote => !quote.match(RE));
    let resultArr: string[] = [];
    quoteArr.forEach(q => {
      if (q.length > 40) {
        resultArr.push(...this.splitByLength(q));
      } else {
        resultArr.push(q);
      }
    });
    return resultArr;
  };

  sliceDisplayQuotes = () => {
    const {
      result: { quote }
    } = this.state;
    const { pageNum } = this.state;
    const displayQuotes = quote.slice(pageNum * 5, (pageNum + 1) * 5);
    this.setState({ displayQuotes, pageNum: this.state.pageNum + 1 });
  };

  render() {
    console.log(this.state);
    const {
      typeCnt,
      typeWrong,
      pageNum,
      isTest,
      result,
      displayQuotes,
      refs,
      time
    } = this.state;
    return (
      <PracticePresenter
        typeCnt={typeCnt}
        typeWrong={typeWrong}
        pageNum={pageNum}
        result={result}
        displayQuotes={displayQuotes}
        refs={refs}
        time={time}
        keyDownHandler={this.keyDownHandler}
        keyUpHandler={this.keyUpHandler}
        changeHandler={this.changeHandler}
      />
    );
  }

  keyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //enter는 글 length와 같을때만 입력가능.
    if (event.key === "Enter" || event.keyCode === 32) {
      const { maxLength, value } = event.currentTarget;
      if (maxLength === value.length) {
        //마지막 글자 오타검사
        const {
          currentTarget: { value, parentElement }
        } = event;
        const compareLength = value.length - 1;
        const comSpan = parentElement?.getElementsByClassName(
          `c${compareLength}`
        )[0];
        this.isWrong(value, compareLength, comSpan);
        if (this.state.inputIndex === 4) {
          //다음장으로 이동합시다.
          this.goNextPage();
        } else {
          const nextIndex = this.state.inputIndex + 1;
          this.state.refs[nextIndex].focus();
          this.setState({ inputIndex: nextIndex, currentLength: 0 });
        }
      } else {
        return;
      }
    }
  };

  createTimer() {
    const timerId = setInterval(() => {
      this.setState({ time: this.state.time + (this.state.isTest ? -1 : 1) });
    }, 1000);
    this.setState({
      timer: timerId
    });
  }

  stopTimer() {
    clearInterval(this.state.timer);
  }

  keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.defaultPrevented) {
      return;
    }

    if (PREVENT_KEYS.includes(event.keyCode)) {
      event.preventDefault();
      return;
    } else if (NO_COUNT_KEYS.includes(event.keyCode)) {
      return;
    }
    this.setState({ typeCnt: this.state.typeCnt + 1 });
    if (this.state.timer === 0) {
      //timer 시작
      //종료 타이밍은
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
    this.setState({ inputIndex: 0 });
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
}

export default withRouter(PracticeContainer);
