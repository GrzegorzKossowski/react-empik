import { CART_TYPES } from './cart-types'
import { fetchCartProducts } from '../api/cart-api'

export const fetchAllProducts = (dispatch) => {
    console.log("inside of fetch all aciton");
    dispatch({ type: CART_TYPES.CART_LIST_REQUEST })
    fetchCartProducts().then(response => {
        const { data } = response
        dispatch({
            type: CART_TYPES.CART_LIST_SUCCESS,
            payload: data
        })
    }).catch(error => {
        dispatch({
            type: CART_TYPES.CART_LIST_FAIL,
            payload: error
        })
    })
}