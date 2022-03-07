import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {ProductsProvider} from "./context/ProductContext";
import {FilterProvider} from "./context/FilterContext";
import {CartProvider} from "./context/CartContext";
import {Auth0Provider} from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
      <Auth0Provider redirectUri={window.location.origin} domain={'dev-1twy4v4x.us.auth0.com'} clientId={'wdEz2IlNdpQg2kL96Sb65dHZGLlwHmXt'}>
        <BrowserRouter>
          <ProductsProvider>
              <FilterProvider>
                  <CartProvider>
                      <App />
                  </CartProvider>
              </FilterProvider>
          </ProductsProvider>
        </BrowserRouter>
      </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

