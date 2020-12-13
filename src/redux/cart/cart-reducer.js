import { CartActionTypes } from './cart-types'

const initialState = { products: [], total: 0 }

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CartActionTypes.PRODUCT_LIST_REQUEST:
            return { ...state, loading: true, products: [] }
        case CartActionTypes.PRODUCT_LIST_SUCCESS:
            return { ...state, loading: false, products: action.payload }
        case CartActionTypes.PRODUCT_LIST_FAIL:
            return { ...state, loading: false, error: action.payload }
        // case CartActionTypes.PRODUCT_AMOUNT_INCREMENT:
        //     return { ...state, products: action.payload }
        // case CartActionTypes.PRODUCT_AMOUNT_DECREMENT:
        //     return { ...state, products: action.payload }
        case CartActionTypes.PRODUCT_AMOUNT_RESET_TO_MIN:
            return { ...state, products: action.payload }

        case CartActionTypes.PRODUCT_UPDATE_AMOUNT:
            return { ...state, products: action.payload }

        case CartActionTypes.SET_TOTAL_SUM:
            return { ...state, total: action.payload }
        default:
            return state
    }
}

