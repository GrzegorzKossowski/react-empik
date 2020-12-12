import { combineReducers } from 'redux'
// import cart reducer
import { cartReducer } from './cart/cart-reducer'

export default combineReducers({
    cart: cartReducer
    // other reducers
    // ...
})