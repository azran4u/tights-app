import ReactDOM from "react-dom";
import App from "./App/App";
import "./index.scss";
import { ProductsProvider } from "./components/old/context/products_context";
import { FilterProvider } from "./components/old/context/filter_context";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { enableMapSet } from "immer";

enableMapSet();

ReactDOM.render(
  <ProductsProvider>
    <FilterProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </FilterProvider>
  </ProductsProvider>,
  document.getElementById("root")
);
