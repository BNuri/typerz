import React, {useState, useEffect} from "react";
import GlobalStyles from "./GlobalStyles";
import Router from "./Components/Router";
import TooSmall from "./Components/TooSmall";

function App() {
  const [state, setState] = useState({ height: 0, width: 0});
  const getDocumentScale = () => {
    setState({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffect(()=> {
    getDocumentScale();
    window.addEventListener('resize', getDocumentScale);
    return () => window.removeEventListener('resize', getDocumentScale);
  }, [])

  return (
    <div className="App">
      <GlobalStyles />
      <Router />
      {
        (state.width <= 1100 || state.height <= 850) && <TooSmall /> 
      }
    </div>
  );
}

export default App;
