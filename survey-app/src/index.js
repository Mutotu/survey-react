import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// const e = React.createElement;
// const containers = document.querySelectorAll(".cfe-app");
// containers.forEach((domContainer) => {
//   const url = domContainer.dataset.url;
//   const reactApp = e(App, { url: url });
//   ReactDOM.render(reactApp, domContainer);
// });
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
