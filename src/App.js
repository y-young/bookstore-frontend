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
import Books from "routes/Books";
import Cart from "routes/Cart";
import Home from "routes/Home";
import Login from "routes/Login";
import OrderDetail from "routes/OrderDetail";
import Orders from "routes/Orders";
import Register from "routes/Register";
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
          <Route path="/users">
            <UserManagement />
          </Route>
          <Redirect from="*" to="/" />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
