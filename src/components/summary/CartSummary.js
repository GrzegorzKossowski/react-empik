import React, { useEffect, useState } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setTotalSum } from '../../redux/cart/cart-actions'

import { priceToLocale } from '../../utils/utils'
import './cart-summary.css'

const CartSummary = (props) => {

  const dispatch = useDispatch()
  const { loading, error, products, total } = useSelector(state => state.cart)
  // const [total, setTotal] = useState(0)

  useEffect(() => {
    let totalSum = 0
    if (products.length !== 0) {
      totalSum = products.reduce((acc, prod) => {
        return acc + (prod.price * prod.amount)
      }, 0)
    }
    // setTotal(totalSum)
    dispatch(setTotalSum())
    return () => {
      // cleanup
    }
  }, [products, dispatch])

  return (
    <>
      {
        loading
          ?
          (<div>Calculating...</div>)
          :
          error
            ?
            (<div>{error.message}</div>)
            :
            (
              <div><i className="fas fa-shopping-cart"></i> Total: {priceToLocale(total)}</div>
            )
      }
    </>
  )
}

export default CartSummary
