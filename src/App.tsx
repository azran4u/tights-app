import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SingleProductPage from "./features/Product/SingleProductPage";
import CheckoutPage from "./features/Checkout/CheckoutPage";
import ErrorPage from "./features/Error/ErrorPage";
import SuccessfulOrder from "./features/SuccessfulOrder/SuccessfulOrderPage";
import HomePage from "./features/Home/HomePage";
import ShippingPage from "./features/Shipping/ShippingPage";
import CartPage from "./features/Cart/components/CartPage";
import ScrollToTop from "./shared/ScrollToTop";
import Navbar from "./features/Layout/Navbar/Nav";
import Sidebar from "./features/Layout/Sidebar/components/Sidebar";
import Footer from "./features/Layout/Footer/Footer";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { saleActions, selectSale } from "./features/Sale/store/saleSlice";
import SaleClosed from "./features/Sale/SaleClosedPage";
import Loading from "./shared/Loading";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(saleActions.fetchActiveSale());
  }, [dispatch]);

  const { activeSale, isLoading } = useAppSelector(selectSale);
  const [isSaleClosed, setIsSaleClosed] = useState(false);

  useEffect(() => {
    setIsSaleClosed(activeSale?.active ?? false);
  }, [activeSale]);

  if (isLoading) return <Loading />;

  if (!isSaleClosed) return <SaleClosed />;

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/shipping">
            <ShippingPage />
          </Route>
          <Route exact path="/cart">
            <CartPage />
          </Route>
          <Route exact path="/products">
            <HomePage />
          </Route>
          <Route exact path="/error">
            <ErrorPage />
          </Route>
          <Route exact path="/sale-closed">
            <SaleClosed />
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
            <ErrorPage />
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
