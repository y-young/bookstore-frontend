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
import styles from "./App.less";

const App = () => {
  return (
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
  );
};

export default App;
