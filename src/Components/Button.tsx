import React from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

const Btn = styled.button``;

interface IProp {
  loader: boolean;
  value: string;
}

const Button: React.FunctionComponent<IProp> = ({ loader, value }) => (
  <Btn className="nes-btn is-warning" disabled={loader ? true : false}>
    {loader ? <Spinner /> : value}
  </Btn>
);

export default Button;
