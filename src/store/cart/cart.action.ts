import { createAction, ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.utils";
import { addCartItem, removeCartItem, clearCartItem} from "../../utils/action/cart.action.utils";
import { CART_ACTION_TYPES, SET_IS_CART_OPEN, SET_CART_ITEMS, CartItemT } from "./cart.types";
import { CategoryItem } from '../categories/categories.types';

export type SetToggleIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItemT[]>;

export const setToggleIsCartOpen = withMatcher(
    (cartOpen: boolean): SetToggleIsCartOpen => {
    return createAction(SET_IS_CART_OPEN, !cartOpen);
})

export const setItemInCart = withMatcher(
    (cartItems: CartItemT[]): SetCartItems => {
        return createAction(SET_CART_ITEMS, cartItems)
    }
)

export const setAddItemToCart = (productToAdd: CategoryItem, cartItems: CartItemT[]): SetCartItems => {
    // either add item to cart or increment quantity
    const newCartItems = addCartItem(cartItems, productToAdd)
    return setItemInCart(newCartItems)
}

export const setSubtractItemFromCart = (productToRemove: CartItemT, cartItems: CartItemT[]): SetCartItems => {
    // decrement cartItem quantity
    const newCartItems = removeCartItem(cartItems, productToRemove)
    return setItemInCart(newCartItems)
}

export const setClearItemFromCart = (productToRemove: CartItemT, cartItems: CartItemT[]): SetCartItems => {
    // product will be removed from cart
    const newCartItems = clearCartItem(cartItems, productToRemove)
    return setItemInCart(newCartItems)
}