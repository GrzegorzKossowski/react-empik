import { CART_TYPES } from './cart-types'

export const initialState = { cart: [] }

const reducer = (state, action) => {
    switch (action.type) {
        case CART_TYPES.CART_LIST_REQUEST:
            return {loading: true, cart: []}
        case CART_TYPES.CART_LIST_SUCCESS:
            return { loading: false, cart: action.payload }
        case CART_TYPES.CART_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state

    }
}

export default reducer;