import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer, ScrollToTop } from "../shared";
import { Home, Error, Shipping, Cart } from "../features";
import SingleProductPage from "../features/Product/SingleProductPage";
import CheckoutPage from "../features/Checkout/CheckoutPage";
import ErrorPage from "../features/Error/ErrorPage";
import SuccessfulOrder from "../features/SuccessfulOrder/SuccessfulOrderPage";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/shipping">
            <Shipping />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/products">
            <Home />
          </Route>
          <Route exact path="/error">
            <ErrorPage />
          </Route>
          <Route
            exact
            path="/products/:slug"
            children={<SingleProductPage />}
          />
          <Route exact path="/checkout">
            <CheckoutPage />
          </Route>
          <Route exact path="/successful-order">
            <SuccessfulOrder />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Sidebar />
      {children}
      <Footer />
    </>
  );
};
