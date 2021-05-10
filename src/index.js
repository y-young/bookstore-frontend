import { UseAPIProvider } from "@umijs/use-request";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import React from "react";
import ReactDOM from "react-dom";
import request from "umi-request";
import { ProvideAuth } from "utils/useAuth";
import App from "./App";
import "./index.less";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <UseAPIProvider
      value={{
        requestMethod: (param) => {
          const prefix = "http://localhost:8080/api";
          const token = localStorage.getItem("bookstore_token");
          const headers = token ? { Authorization: token } : {};
          if (typeof param === "string") {
            return request(param, { prefix, headers });
          }
          if (typeof param === "object") {
            return request(param.url, { ...param, prefix, headers });
          }
        },
        formatResult: (response) => response.data,
      }}
    >
      <ConfigProvider locale={zhCN}>
        <ProvideAuth>
          <App />
        </ProvideAuth>
      </ConfigProvider>
    </UseAPIProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
