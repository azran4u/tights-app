import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer, ScrollToTop } from './components';

import {
  Home,
  Error,
  Shipping,
  Checkout,
  Products,
  Cart,
  SuccessfulPayment,
} from './pages';
import SingleProductPageNew from './pages/SingleProductPageNew/SingleProductPageNew';

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
            <Products />
          </Route>
          <Route
            exact
            path="/products/:kind"
            children={<SingleProductPageNew />}
          />
          <Route exact path="/checkout">
            <Checkout />
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
