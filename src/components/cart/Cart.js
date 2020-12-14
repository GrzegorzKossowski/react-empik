import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from '../../redux/cart/cart-actions'

import Product from "../product/Product";
import Spinner from '../spinner/Spinner'

import './cart.css'

/**
 * Main CART component dispalying list of products.
 * 
 * @param {object} props component properties
 */
const Cart = (props) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listProducts())
    return () => {
      // cleanup
    }
  }, [dispatch])

  const { loading, error, products } = useSelector(state => state.cart)

  return (
    <div>
      {
        loading
          ?
          (<Spinner />)
          :
          error
            ?
            (<div className="alert alert-danger error-alert" role="alert" data-cart-error={error.message}>
              Nie można załadować koszyka. Zgłoś błąd lub wróć później.{" "}
            </div>)
            :
            (
              // <div className='cart-table'>
              <div className='container cart'>
                {
                  products.length === 0 ?
                    (<div className="alert alert-info" role="alert">
                      Twój koszyk jest pusty
                    </div>)
                    :
                    products.map(product => <Product key={product.pid} {...product} />)}
              </div>
            )
      }
    </div>
  );
};

export default Cart;
