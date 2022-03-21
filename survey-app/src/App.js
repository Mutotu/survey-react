import React, { useState } from "react";

function verifyTextInputType(inputType) {
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
const SurveyRadioInput = (props) => {
  const { object } = props;
  return (
    <div>
      {object.options.map((option, index) => {
        return (
          <div key={`${object.type}-${index}`}>
            <input
              type={object.type}
              value={option.value}
              name={object.name}
              id={`${object.name}-${index}`}
            />
            <label htmlFor={`${object.name}-${index}`}>{option.label}</label>
          </div>
        );
      })}
    </div>
  );
};

const SurveyYTextInput = (props) => {
  const { value, handleChange } = useInputChange(
    props.defaultValue,
    props.triggerCallback
  );
  const inputType = verifyTextInputType(props.type);
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
    <textarea {...inputProps} />
  ) : (
    <input {...inputProps} />
  );
};

const myInputs = [
  { name: "full_name", type: "text", placeholder: "Yor full name" },
  { name: "email", type: "email", placeholder: "hi@gmail.com" },
  { name: "message", type: "textarea", placeholder: "message" },
  {
    name: "mySingleChoice",
    type: "checkbox",
    options: [
      { value: 1, label: "Label 1" },
      { value: "asd", label: "Label asd" },
      { value: "sdf", label: "Label sdf" },
    ],
  },
  {
    name: "mySingleChoice",
    type: "radio",
    options: [
      { value: 1, label: "Label 1" },
      { value: "asd", label: "Label asd" },
      { value: "sdf", label: "Label sdf" },
    ],
  },
];

const App = (props) => {
  const [inlineData, setInlineData] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    event.persist();

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

      <form onSubmit={handleSubmit}>
        {myInputs.map((obj, index) => {
          return obj.type === "radio" || obj.type === "checkbox" ? (
            <SurveyRadioInput object={obj} key={`input-${index}`} />
          ) : (
            <SurveyYTextInput
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
