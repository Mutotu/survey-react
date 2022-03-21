import React, { useState } from "react";

function LikeBtn(props) {
  const [value, setValue] = useState(0);
  console.log(props, "props");
  console.log(props.children);

  const addOne = () => {
    setValue(value + 1);
  };
  return <button onClick={addOne}>Like {value}</button>;
}

function App(props) {
  return <div>
      <LikeBtn url='https://cfe.sh' >lol<LikeBtn />
      <LikeBtn />
      <LikeBtn />
      <LikeBtn />
    </div>
  
}

export default App;
