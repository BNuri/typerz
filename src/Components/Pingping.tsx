import React from "react";
import styled from "styled-components";
import img from "../assets/images/loader.gif";

const Container = styled.div`
  height: 120px;
  width: 120px;
  background-image: url(${img});
  background-size: cover;
  background-repeat: no-repeat;
`;

const Pingping: React.FunctionComponent = () => <Container />;

export default Pingping;
