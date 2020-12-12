import React from 'react';
import Cart from '../cart/Cart'
import CartSummary from '../summary/CartSummary';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <h3>Lista produktów</h3>
      <Cart />
      <CartSummary />
    </div>
  );
};

export {
  App
};
