import { createSelector } from "reselect";
import { CartState } from "./cart.reducer";

// change when done converting all reducers
const selectCartReducer = (state: any): CartState => {
    return state.cart;
}

export const selectCart = createSelector(
    [selectCartReducer],
    (cartSlice) => cartSlice 
);

export const selectIsCartOpen = createSelector(
    [selectCart],
    (cart) => cart.isCartOpen
)

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => {
        return cart.cartItems }
)

export const selectCartCount = createSelector(
    [selectCart],
    (cart) => cart.cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity
        }, 0)
)

export const selectCartTotal = createSelector(
    [selectCart],
    (cart) => cart.cartItems.reduce((total, cartItem) => {
            return total + (cartItem.price * cartItem.quantity)
        }, 0)
)