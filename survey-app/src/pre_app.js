import React, { useState, useEffect } from "react";

////Functional Component///////

function Clock(props) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    //the reason clearInterval is used is because timerId uses storage and runs forever so to refresh it call clearInterval func also to stop the memory link
    let timerId = setInterval(() => {
      refreshClock();
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  });
  const refreshClock = () => {
    setDate(new Date());
  };

  return (
    <div>
      The time is {date.toLocaleTimeString()}
      {/* <button onClick={refreshClock}>Refresh</button> */}
    </div>
  );
}

function LikeBtn(props) {
  const [value, setValue] = useState(0);
  const defaultVerb = props.verb ? props.verb : "Like";
  const initalVerb = props.children ? props.children : defaultVerb;
  const [verb, setVerb] = useState(initalVerb);

  const addOne = () => {
    setVerb("Clicked");
    setValue(value + 1);
  };
  return (
    <button onClick={addOne}>
      {verb} {value}
    </button>
  );
}

function App(props) {
  return (
    <div>
      <Clock />
      <LikeBtn url='https://cfe.sh'>Love</LikeBtn>
      <LikeBtn />
      <LikeBtn />
      <LikeBtn />
    </div>
  );
}

export default App;
