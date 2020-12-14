import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTotalSum } from '../../redux/cart/cart-actions'
import { priceToLocale } from '../../utils/utils'
import { DotSpinner } from "../spinner/Spinner";

import './cart-summary.css'

/**
 * Component summarizes total amount of money to pay for all products in CART
 * 
 * @param {object} props properties from parent component
 */
const CartSummary = (props) => {

  const dispatch = useDispatch()
  const { loading, calculating, error, products, total } = useSelector(state => state.cart)

  useEffect(() => {

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
            (<div className="alert alert-danger error-alert" role="alert" data-cart-error={error.message}>
              Nie można przeliczyć kwoty. Zgłoś błąd lub wróć później.{" "}
            </div>)
            :
            (
              <div className='d-flex justify-content-between mt-2 cart-summary' >
                <div>
                  <i className="fas fa-shopping-cart"></i> Razem:
                </div>
                {calculating ?
                  <DotSpinner />
                  :
                  <div className='cart-summary-total'>
                    {priceToLocale(total)}
                  </div>
                }
              </div>
            )
      }
    </>
  )
}

export default CartSummary
