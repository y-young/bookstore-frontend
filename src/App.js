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
  useHistory,
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
import request from "umi-request";
import styles from "./App.less";

const App = () => {
  const history = useHistory();

  return (
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
        onError: async (error, params) => {
          const body = await error.response.json();
          const { status } = error.response;
          switch (status) {
            case 500:
              message.error("服务器错误");
              break;
            case 401:
              message.warn("请先登录");
              history.push("/login");
              break;
            default:
              message.error(body.message);
          }
        },
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
            <Route path="/books/:bookId">
              <BookDetail />
            </Route>
            <Route path="/books">
              <Books />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/order">
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
        <Footer />
      </Router>
    </UseAPIProvider>
  );
};

export default App;
