import React from "react";
import styled from "styled-components";

const Container = styled.h1`
  font-size: 22px;
  padding-bottom: 30px;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

const Title: React.FunctionComponent<{ title: string }> = ({ title }) => (
  <Container>{title}</Container>
);

export default Title;
