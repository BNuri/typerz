import React from "react";
import styled from "styled-components";
import img from "../assets/images/fireworks02.gif";

const Container = styled.div`
  height: 700px;
  width: 700px;
  background-image: url(${img});
  background-size: cover;
  background-repeat: no-reapeat;
`;

const Fireworks = () => <Container />;

export default Fireworks;
