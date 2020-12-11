import React, { useEffect, useState, useReducer } from "react";
import Product from "../product/Product";
import { fetchCartProducts } from '../../api/cart-api'

// reducer
import reducer, { initialState } from '../../reducer/reducer'
import { fetchAllProducts } from '../../reducer/cart-actions'
import { CART_TYPES } from '../../reducer/cart-types'

const Cart = (props) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const [cart, setCart] = useState([])
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchAllProducts(dispatch);
    return () => {
      // cleanup
    }
  }, [])

  return (
    <>
      {
        state.loading
          ?
          (<div>Loading...</div>)
          :
          state.error
            ?
            (<div>{state.error.message}</div>)
            :
            (
              <div>
                <ul>
                  {state.cart.map(product => <Product key={product.pid} {...product} />)}
                </ul>
                <div style={{textAlign: 'right'}}>
                  suma:
                </div>
              </div>
            )
      }
    </>
  );
};

export default Cart;
