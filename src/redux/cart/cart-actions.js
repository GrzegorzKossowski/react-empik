import { fetchProducts, checkAmount } from '../../api/cart-api'
import { CartActionTypes } from './cart-types'
import { debounce, DEBOUNCE_TIMEOUT } from '../../utils/utils'

export const listProducts = () => (dispatch) => {
    dispatch({ type: CartActionTypes.PRODUCT_LIST_REQUEST })
    fetchProducts().then((resolve, reject) => {
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

export const incrementAmount = (pid) => (dispatch, getState) => {

    const products = getState().cart.products.map(prod => {
        return { ...prod, amount: prod.pid === pid ? prod.amount + 1 : prod.amount }
    })

    dispatch({
        type: CartActionTypes.PRODUCT_AMOUNT_INCREMENT,
        payload: products
    })

}

export const decrementAmount = (pid) => (dispatch, getState) => {

    const products = getState().cart.products.map(prod => {
        return { ...prod, amount: prod.pid === pid ? prod.amount - 1 : prod.amount }
    })

    dispatch({
        type: CartActionTypes.PRODUCT_AMOUNT_DECREMENT,
        payload: products
    })
}

export const resetAmountToMin = (pid) => (dispatch, getState) => {

    const products = getState().cart.products.map(prod => {
        return { ...prod, amount: prod.pid === pid ? prod.min : prod.amount }
    })

    dispatch({
        type: CartActionTypes.PRODUCT_AMOUNT_RESET_TO_MIN,
        payload: products
    })
}

export const setTotalSum = (total) => (dispatch) => {

    dispatch({
        type: CartActionTypes.SET_TOTAL_SUM,
        payload: total
    })

}