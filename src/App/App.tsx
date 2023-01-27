import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer, ScrollToTop } from "../shared";

import { Home, Error, Shipping, Cart, SuccessfulPayment } from "../features";
import SingleProductPage from "../features/Products/SingleProduct/SingleProductPage";

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
          <Route
            exact
            path="/products/:kind"
            children={<SingleProductPage />}
          />
          <Route exact path="/checkout">
            <Cart />
          </Route>
          <Route exact path="/successful_payment">
            <SuccessfulPayment />
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
