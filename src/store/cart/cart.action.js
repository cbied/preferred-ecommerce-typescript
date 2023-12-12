import { createAction } from "../../utils/reducer/reducer.utils";
import { addCartItem, removeCartItem, clearCartItem } from "../../utils/action/cart.action.utils";
import { SET_IS_CART_OPEN, SET_CART_ITEMS } from "./cart.types";

export const setToggleIsCartOpen = (cartOpen) => {
    return createAction(SET_IS_CART_OPEN, !cartOpen);
}

export const setAddItemToCart = (productToAdd, cartItems) => {
    // either add item to cart or increment quantity
    const newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(SET_CART_ITEMS, newCartItems)
}

export const setSubtractItemFromCart = (productToRemove, cartItems) => {
    // decrement cartItem quantity
    const newCartItems = removeCartItem(cartItems, productToRemove)
    return createAction(SET_CART_ITEMS, newCartItems)
}

export const setClearItemFromCart = (productToRemove, cartItems) => {
    // product will be removed from cart
    const newCartItems = clearCartItem(cartItems, productToRemove)
    return createAction(SET_CART_ITEMS, newCartItems)
}