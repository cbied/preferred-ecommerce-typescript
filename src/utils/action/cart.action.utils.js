
export const addCartItem = (cartItems, productToAdd) => {
    // find if item is in cart already
    console.log(cartItems)
    console.log(productToAdd)
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
    if(existingCartItem) {
        return cartItems.map(cartItem => (
            // increment the quantity of the item
            cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1 }
            :
            cartItem
        ))
    } 
    // if item is not currently in cart, add the item to the cart and give a quantity of 1
    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

export const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToRemove.id);

        // if user is removing item from cart and quantity is at 1, remove item from cart entirely
        if (existingCartItem && existingCartItem.quantity === 1) {
            return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
          }

        // if user is removing item from cart but has more than 1 of same item, decrease quantity
        return cartItems.map(cartItem => cartItem.id === productToRemove.id ? 
            {...cartItem, quantity: cartItem.quantity - 1 } 
            : 
            cartItem
        )
}

export const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);