import Footer from "components/Footer";
import Header from "components/Header";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BookDetail from "routes/BookDetail";
import Cart from "routes/Cart";
import Home from "routes/Home";
import Login from "routes/Login";
import OrderResult from "routes/OrderResult";
import Register from "routes/Register";
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
          <Route path="/book">
            <BookDetail />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/result">
            <OrderResult />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
