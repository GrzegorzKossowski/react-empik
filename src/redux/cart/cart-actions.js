import { fetchProducts } from '../../api/cart-api'
import { CartActionTypes } from './cart-types'

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
        if (prod.amount < prod.max) {
            return { ...prod, amount: prod.pid === pid ? prod.amount + 1 : prod.amount }
        }
        return { ...prod }
    })

    dispatch({
        type: CartActionTypes.PRODUCT_AMOUNT_INCREMENT,
        payload: products
    })
}

export const decrementAmount = (pid) => (dispatch, getState) => {

    const products = getState().cart.products.map(prod => {
        if (prod.amount > prod.min) {
            return { ...prod, amount: prod.pid === pid ? prod.amount - 1 : prod.amount }
        }
        return { ...prod }
    })

    dispatch({
        type: CartActionTypes.PRODUCT_AMOUNT_DECREMENT,
        payload: products
    })
}

export const setTotalSum = (total) => (dispatch) => {

    dispatch({
        type: CartActionTypes.SET_TOTAL_SUM,
        payload: total
    })

}