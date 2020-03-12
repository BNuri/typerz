import React from "react";
import styled from "styled-components";

const Container = styled.input``;

const Input: React.FunctionComponent<{
  placeholder: string;
}> = ({ placeholder }) => <Container placeholder={placeholder} />;

export default Input;
