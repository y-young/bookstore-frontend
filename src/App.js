import { UseAPIProvider } from "@umijs/use-request";
import { message } from "antd";
import Footer from "components/Footer";
import Header from "components/Header";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import BookDetail from "routes/BookDetail";
import BookManagement from "routes/BookManagement";
import Books from "routes/Books";
import Cart from "routes/Cart";
import Home from "routes/Home";
import Login from "routes/Login";
import OrderDetail from "routes/OrderDetail";
import OrderManagement from "routes/OrderManagement";
import Orders from "routes/Orders";
import Register from "routes/Register";
import Settings from "routes/Settings";
import Statistics from "routes/Statistics";
import UserManagement from "routes/UserManagement";
import { extend } from "umi-request";
import styles from "./App.less";
import Chat from "./components/Chat";
import BooksByTag from "./routes/BooksByTag";
import OrderSubmitted from "./routes/OrderSubmitted";

const App = () => {
  return (
    <UseAPIProvider
      value={{
        requestMethod: (param) => {
          const prefix = "https://bookstore.gpx.moe:8080";
          const token = localStorage.getItem("bookstore_token");
          const headers = token
            ? { Authorization: token.replaceAll('"', "") } // Remove double quotes
            : {};
          const request = extend({
            prefix,
            headers,
            mode: "cors",
            errorHandler: async (error) => {
              const { response } = error;
              if (!response) {
                message.error("请求超时，请重试");
                return;
              }
              const body = await response.json();
              const { status } = response;
              if (status < 400) {
                return response;
              }
              switch (status) {
                case 500:
                  message.error("服务器错误");
                  break;
                case 401:
                  message.warn("请先登录");
                  window.location.href = "/login";
                  break;
                case 404:
                  message.error("请求的资源未找到");
                  window.location.href = "/";
                  break;
                default:
                  message.error(body.message);
              }
              throw error;
            },
          });
          if (typeof param === "string") {
            return request(param);
          }
          if (typeof param === "object") {
            return request(param.url, { ...param });
          }
        },
        formatResult: (response) => response.data,
      }}
    >
      <Router>
        <Header />
        <main className={styles.main}>
          <Switch>
            <Route path="/" exact={true}>
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/books/tag/:tag">
              <BooksByTag />
            </Route>
            <Route path="/books/:bookId">
              <BookDetail />
            </Route>
            <Route path="/books">
              <Books />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/orders/submitted">
              <OrderSubmitted />
            </Route>
            <Route path="/orders/:orderId">
              <OrderDetail />
            </Route>
            <Route path="/orders">
              <Orders />
            </Route>
            <Route path="/statistics">
              <Statistics />
            </Route>
            <Route path="/manage/books">
              <BookManagement />
            </Route>
            <Route path="/manage/users">
              <UserManagement />
            </Route>
            <Route path="/manage/orders">
              <OrderManagement />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Redirect from="*" to="/" />
          </Switch>
        </main>
        <Chat />
        <Footer />
      </Router>
    </UseAPIProvider>
  );
};

export default App;
