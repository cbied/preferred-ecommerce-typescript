import { AnyAction } from "redux";
import { CartItemT } from "./cart.types";
import { setToggleIsCartOpen, setItemInCart } from "./cart.action";

export type CartState = {
    readonly isCartOpen: boolean,
    readonly cartItems: CartItemT[]
}

export const INITIAL_CART_STATE: CartState = {
    isCartOpen: false,
    cartItems: []
}

export const cartReducer = (state = INITIAL_CART_STATE, action: AnyAction): CartState => {
    if(setToggleIsCartOpen.match(action)) {
        return { ...state, isCartOpen: action.payload }
    }
    if(setItemInCart.match(action)) {
        return { ...state, cartItems: action.payload }
    }

    return state
}