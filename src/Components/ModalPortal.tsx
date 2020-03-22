import ReactDOM from "react-dom";
import React from "react";

interface IProp {
  children: React.ReactNode;
}

const ModalPortal = ({ children }: IProp) => {
  const el = document.getElementById("modal") || document.createElement("div");
  return ReactDOM.createPortal(children, el);
};

export default ModalPortal;
