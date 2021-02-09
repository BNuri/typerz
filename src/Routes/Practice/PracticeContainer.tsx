import React, { useState, useEffect, useRef } from "react";
import PracticePresenter from "./PracticePresenter";
import { useLocation, useHistory, useParams } from "react-router-dom";
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

interface IState {
  typeCnt: number;
  typeWrong: number[];
  currentValue: string;
  currentIndex: number;
  pageNum: number;
  pageTotal: number;
  endInputIndex: number;
  isTest: boolean;
  time: number;
  timer: number;
  focuser: number;
  result: { title: string; writer: string; quote: string[] };
  displayQuotes: string[];
  userQuotes: string[];
  inputIndex: number;
  modal: boolean;
  loading: boolean;
  loader: boolean;
}

const PracticeContainer :React.FunctionComponent = () => {
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const inputEl = useRef<HTMLInputElement>(null);

  const [state, setState] = useState<IState>({
    typeCnt: 0,
    typeWrong: [],
    currentValue: "",
    currentIndex: 0,
    // currentQuote: "",
    pageNum: -1,
    pageTotal: 0,
    endInputIndex: 0,
    isTest: location.pathname.includes("/test/"),
    time: 0,
    timer: 0,
    focuser: 0,
    result: { title: "", writer: "", quote: [] },
    displayQuotes: [],
    userQuotes: [],
    inputIndex: 0,
    modal: false,
    loading: true,
    loader: false,
  });


  useEffect(() => {
      const { isTest } = state;
      if (id === '' || typeof id === 'undefined') {
        return history.push('/');
      }

      let result: { title: "", writer: "", quote: [] }, 
        pageTotal = 0,
        endInputIndex = 0;

      async function getQuote(id: string) {
        ({data: result} = await quoteApi.getQuote(id));
        const { quote } = result;
        pageTotal = Math.ceil(quote.length / 5);
        endInputIndex = (quote.length % 5) - 1 < 0 ? 4 : (quote.length % 5) - 1;
        setState(state => ({
          ...state,
          result,
          pageTotal,
          endInputIndex,
          loading: false,
          time: isTest ? 300 : 0
        }));
      }

      getQuote(id);

      return () => {
        setState({ ...state, modal: false});
        stopTimer(); 
        stopFocuser();
      }
  // eslint-disable-next-line
  }, []);

  useEffect(() => {
    sliceCurrentQuotes();
    // eslint-disable-next-line
  }, [state.result]);

  useEffect(() => {
    createFocuser();
  }, []);

  const sliceCurrentQuotes = () => {
    const {
      result: { quote },
      pageNum,
    } = state;
    const displayQuotes = quote.slice(pageNum * 5, (pageNum + 1) * 5);
    setState(state => ({ ...state, displayQuotes, pageNum: state.pageNum + 1 }));
  };

  const goNextLine = () => {
    const { inputIndex } = state;
    const nextIndex = inputIndex + 1;
    setState(state => ({ ...state, inputIndex: nextIndex, currentIndex: 0 }));
  };

  const goNextPage = () => {
    sliceCurrentQuotes();
    setState(state => ({ ...state, inputIndex: 0, currentIndex: 0, userQuotes: [] }));
    document
      .querySelectorAll(".wrong")
      .forEach((span) => span.classList.remove("wrong"));
  };

  const goNextStep = () => {
    const { pageNum, pageTotal, inputIndex, endInputIndex } = state;
    if (pageNum === pageTotal && inputIndex === endInputIndex) {
      stopTyping();
    } else if (inputIndex === 4) {
      goNextPage();
    } else {
      goNextLine();
    }
  };

  const createFocuser = () => {
    console.log('createFocuser!!!!!!!');
    const focuserId = window.setInterval(() => {
      inputEl.current?.focus();
    }, 500);
    setState(state => ({ ...state, focuser: focuserId }));
  };

  const stopFocuser = () => {
    clearInterval(state.focuser);
  }

  const createTimer = () => {
    const timerId = window.setInterval(() => {
      setState(state => ({ ...state, time: state.time + (state.isTest ? -1 : 1) }));
    }, 1000);
    setState(state => ({
      ...state,
      timer: timerId,
    }));
    if (state.isTest) {
      setTimeout(stopTyping, 300000);
    }
  };

  const stopTimer = () => {
    clearInterval(state.timer);
  };

  const openModal = () => {
    setState(state => ({ ...state, modal: true }));
  };

  const closeModal = () => {
    history.push("/");
  };

  const stopTyping = () => {
    stopTimer();
    stopFocuser();
    openModal();
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = event;
    if (PREVENT_KEYS.includes(keyCode)) {
      event.preventDefault();
      return false;
    } else if (!NO_COUNT_KEYS.includes(keyCode)) {
      setState(state => ({ ...state, typeCnt: state.typeCnt + 1 }));
    }
    if (state.timer === 0) {
      createTimer();
    }
  };

  const getStroke = (kor?: string) => {
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

  const isWrong = (value: string, compareIndex: number, comSpan?: Element) => {
    if (!comSpan) return;
    const userChar = value[compareIndex];
    const comClass = comSpan.className;
    const comChar = comSpan.textContent;
    if (!comChar) return;
    const stroke = getStroke(comChar);
    if (comChar !== userChar && !comClass?.includes("wrong")) {
      setState(state => ({ ...state, typeWrong: [...state.typeWrong, stroke] }));
      comSpan?.classList.add("wrong");
    }
  };

  const deleteWrong = (comSpan?: Element) => {
    const comClass = comSpan?.className;
    if (comClass?.includes("wrong")) {
      setState(state => ({
        ...state,
        typeWrong: state.typeWrong.filter(
          (w, i) => i !== state.typeWrong.length - 1
        ),
      }));
      comSpan?.classList.remove("wrong");
    }
  };

  const keyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { parentElement, value } = event.currentTarget;
    const maxLength = state.displayQuotes[state.inputIndex].length;
    const { currentValue } = state;
    if (event.keyCode === 13 || event.keyCode === 32) {
      if (maxLength === currentValue.length) {
        let compareIndex = currentValue.length - 1;
        const comSpan = parentElement?.getElementsByClassName(
          `c${state.inputIndex}-${compareIndex}`
        )[0];
        isWrong(currentValue, compareIndex, comSpan);
        if(inputEl && inputEl.current){
          inputEl.current.value = "";
        }
        setState(state => ({ ...state, currentIndex: 0, currentValue: "" }));
        goNextStep();
      }
    } else if (event.keyCode === 27) {
      //****************************************지울것
      stopTyping();
    } else {
      const newUserQuotes = [...state.userQuotes];
      newUserQuotes[state.inputIndex] = value;
      setState(state => ({ ...state, currentValue: value, userQuotes: newUserQuotes }));
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, parentElement } = event.currentTarget;
    const { currentValue, currentIndex } = state;
    const compareIndex = value.length - 2;
    if (currentIndex < value.length) {
      if (value.length === 1) return;
      const comSpan = parentElement?.getElementsByClassName(
        `c${state.inputIndex}-${compareIndex}`
      )[0];
      isWrong(value, compareIndex, comSpan);
      setState(state => ({ ...state, currentIndex: compareIndex + 1 }));
    } else {
      const comSpan = parentElement?.getElementsByClassName(
        `c${state.inputIndex}-${compareIndex + 2}`
      )[0];
      deleteWrong(comSpan);
      setState(state => ({
        ...state, 
        currentIndex: currentValue.length - 1,
      }));
    }
  };

  const createRecord = async (creator: string) => {
    const { typeCnt, typeWrong, time, isTest } = state;
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
    try {
      if(typeof id !== 'undefined') {
      const { data: myRecord } = await recordApi.createRecords(id, newRecord);
      history.push({
        pathname: `/ranking/${id}`,
        state: { myRanking: myRecord._id },
      });
    }
    } catch (error) {
      console.warn(error);
    }
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setState(state => ({ ...state, loader: true }));
    const { currentTarget } = event;
    const name = currentTarget.getElementsByTagName("input")[0].value;
    createRecord(name);
  };


  return (
    <PracticePresenter
    typeCnt={state.typeCnt}
    typeWrong={state.typeWrong}
    isTest={state.isTest}
    pageNum={state.pageNum}
    pageTotal={state.pageTotal}
    result={state.result}
    displayQuotes={state.displayQuotes}
    userQuotes={state.userQuotes}
    inputEl={inputEl}
    currentIndex={state.currentIndex}
    inputIndex={state.inputIndex}
    time={state.time}
    modal={state.modal}
    keyDownHandler={keyDownHandler}
    keyUpHandler={keyUpHandler}
    changeHandler={changeHandler}
    closeModal={closeModal}
    submitHandler={submitHandler}
    loading={state.loading}
    loader={state.loader}
  />
  );
}

export default PracticeContainer;
