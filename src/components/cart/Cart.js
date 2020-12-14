import React, { useEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from '../../redux/cart/cart-actions'

import Product from "../product/Product";
import './cart.css'

const Cart = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    // effect
    dispatch(listProducts())
    return () => {
      // cleanup
    }
  }, [dispatch])

  const { loading, error, products } = useSelector(state => state.cart)

  return (
    <>
      {
        loading
          ?
          (<div>Loading...</div>)
          :
          error
            ?
            (<div class="alert alert-danger" role="alert">{error.message}</div>)
            :
            (
              <ul className='cart-table'>
                {products.map(product => <Product key={product.pid} {...product} />)}
              </ul>
            )
      }
    </>
  );
};

export default Cart;
