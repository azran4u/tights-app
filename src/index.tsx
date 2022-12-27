import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { enableMapSet } from 'immer';
enableMapSet();
ReactDOM.render(
  <ProductsProvider>
    <FilterProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </FilterProvider>
  </ProductsProvider>,
  document.getElementById('root')
);
