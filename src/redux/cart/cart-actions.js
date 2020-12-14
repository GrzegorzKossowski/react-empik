import { fetchProducts, checkAmount } from '../../api/cart-api'
import { CartActionTypes } from './cart-types'
import { debounce, DEBOUNCE_TIMEOUT } from '../../utils/utils'

/**
 * Setter for products in CART. Fullfils cart with products from server.
 */
export const listProducts = () => async (dispatch) => {
    dispatch({ type: CartActionTypes.PRODUCT_LIST_REQUEST })
    await fetchProducts().then((resolve, reject) => {
        const { data } = resolve
        const products = data.map(product => {
            return {
                ...product,
                amount: product.min
            }
        })
        dispatch({
            type: CartActionTypes.PRODUCT_LIST_SUCCESS,
            payload: products
        })
    }).catch(error => {
        dispatch({
            type: CartActionTypes.PRODUCT_LIST_FAIL,
            payload: error
        })
    })
}

/**
 * Sets amount of products that user has selected.
 * 
 * @param {string} pid product ID
 * @param {number} amount amount of products in every category
 */
export const updateProductAmount = (pid, amount) => async (dispatch, getState) => {

    const products = getState().cart.products.map(prod => {
        return { ...prod, amount: prod.pid === pid ? amount : prod.amount }
    })

    dispatch({
        type: CartActionTypes.PRODUCT_UPDATE_AMOUNT,
        payload: products
    })

}

/**
 * Sets total sum of product prices to pay by user, as: sum = product * amount
 */
export const setTotalSum = () => async (dispatch, getState) => {


    const total = parseFloat(getState().cart.products.reduce((acc, prod) => {
        return acc + (prod.price * prod.amount)
    }, 0).toFixed(2))


    dispatch({
        type: CartActionTypes.SET_TOTAL_SUM,
        payload: total
    })

}

/**
 * Sets calculating to true
 */
export const setTotalSumCalculating = () => async (dispatch, getState) => {
    dispatch({ type: CartActionTypes.CALCULATE_TOTAL_SUM })
}
