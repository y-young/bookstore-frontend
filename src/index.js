import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import React from "react";
import ReactDOM from "react-dom";
import { ProvideAuth } from "utils/useAuth";
import App from "./App";
import "./index.less";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <ProvideAuth>
        <App />
      </ProvideAuth>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
