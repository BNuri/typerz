import ReactDOM from "react-dom";
import React from "react";

interface IProp {
  children: React.ReactNode;
}

const ModalPortal = ({ children }: IProp) => {
  const el = document.getElementById("modal") || document.createElement("div");
  return ReactDOM.createPortal(children, el);
};

// class ModalPortal extends React.Component<IProp> {
//   container: HTMLDivElement;
//   modalRoot: HTMLElement;
//   constructor(props: IProp) {
//     super(props);
//     this.modalRoot =
//       document.getElementById("modal") || document.createElement("div");
//     this.modalRoot.className = "root-modal";
//     this.container = document.createElement("div");
//   }

//   componentDidMount(): void {
//     this.modalRoot.appendChild(this.container);
//   }

//   componentWillUnmount(): void {
//     this.modalRoot.removeChild(this.container);
//   }

//   render(): React.ReactElement<IProp> {
//     return ReactDOM.createPortal(this.props.children, this.container);
//   }
// }

export default ModalPortal;
