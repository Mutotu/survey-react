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
///////////////////////////////////////
///////////////////////////////////////
////
import React, { useState } from "react";

function verifyInputType(inputType) {
  let type = "text";
  switch (inputType) {
    case "email":
      type = "email";
      break;
    case "number":
      type = "number";
      break;
    case "textarea":
      type = "textarea";
      break;
    default:
      type = "text";
  }
  return type;
}
const useInputChange = (customValue, callback) => {
  const [value, setValue] = useState(customValue ? customValue : "");
  const handleChange = (event) => {
    let newValue = event.target.value;
    setValue(newValue);
    if (callback) {
      callback(event.target.name, newValue);
    }
  };

  return {
    value: value,
    handleChange: handleChange,
  };
};
const SurveyInput = (props) => {
  const { value, handleChange } = useInputChange(
    props.defaultValue,
    props.triggerCallback
  );
  const inputType = verifyInputType(props.type);
  const inputProps = {
    className: "form-control",
    onChange: handleChange,
    value: value,
    type: inputType,
    placeholder: "Your name",
    placeholder: props.placeholder ? props.placeholder : "Your text",
    name: props.name ? props.name : `${inputType}_${props.key}`,
  };
  return inputType === "textarea" ? (
    //   <textarea
    //     {...inputProps}
    //     // className={inputProps.className}
    //     onChange={handleChange}
    //     value={name}
    //     type={inputType}
    //     placeholder='Your Name'
    //     name='full_name'
    //   />
    // ) : (
    //   <input
    //     className='form-control'
    //     onChange={handleChange}
    //     value={name}
    //     type={inputType}
    //     placeholder='Your Name'
    //     name='full_name'
    //   />
    /////////deconstructing/////
    <textarea {...inputProps} />
  ) : (
    <input {...inputProps} />
  );
};

const myInputs = [
  { name: "full_name", type: "text", placeholder: "Yor full name" },
  { name: "email", type: "email", placeholder: "hi@gmail.com" },
  { name: "message", type: "textarea", placeholder: "message" },
];

const App = (props) => {
  const [inlineData, setInlineData] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    event.persist();
    // XMLHttpRequest() //async
    let formData = new FormData();
    for (let formInput of event.target.elements) {
      if (formInput.name !== "save_btn") {
        formData.append(formInput.name, formInput.value);
      }
    }
  };

  const callBack = (name, value) => {
    inlineData[name] = value;
    setInlineData(inlineData);
    console.log(inlineData);
  };

  return (
    <div className='col-10 mx-auto text-center'>
      <h1>Hello There</h1>
      {/* <h1>Hello There</h1>
      <SurveyInput
        placeholder='My Placeholder'
        name='first_name'
        defaultValue='Muto'
      />
      <SurveyInput
        type='textarea'
        placeholder='My Placeholder'
        name='first_name'
      />
      <SurveyInput
        type='number'
        placeholder='My Placeholder'
        name='first_name'
      />
      <SurveyInput
        type='email'
        placeholder='My Placeholder'
        name='first_name'
      /> */}
      <form onSubmit={handleSubmit}>
        {myInputs.map((obj, index) => {
          return (
            <SurveyInput
              type={obj.type}
              triggerCallback={callBack}
              placeholder={obj.placeholder}
              defaultValue={obj.defaultValue}
              name={obj.name}
              key={`input-${index}`}
            />
          );
        })}
        <button type='input' className='btn btn-primary my-5' name='save_btn'>
          Save
        </button>
      </form>
    </div>
  );
};

export default App;
