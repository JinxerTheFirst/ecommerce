import { createContext, useState } from "react";

export let CounterContext = createContext(0);

export default function CounterContextProvider(props) {
  const [counter, setCounter] = useState(0);
  const [userName, setUserName] = useState("");
  function changeCounter() {
    setCounter(Math.random);
  }

  return (
    <CounterContext.Provider value={{ counter, userName, changeCounter }}>
      {props.children}
    </CounterContext.Provider>
  );
}
