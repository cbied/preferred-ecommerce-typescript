import { SET_IS_CART_OPEN, SET_CART_ITEMS } from "./cart.types"

export const INITIAL_CART_STATE = {
    isCartOpen: false,
    cartItems: []
}

export const cartReducer = (state = INITIAL_CART_STATE, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case SET_IS_CART_OPEN:
            return { ...state, isCartOpen: payload }
        case SET_CART_ITEMS:
            return { ...state, cartItems: payload }
        default:
            return state
    }
}