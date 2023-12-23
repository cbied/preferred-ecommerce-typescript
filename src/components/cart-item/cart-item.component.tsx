import { memo } from 'react';
import { CartItemContainer,
         ItemDetails,
         ItemDetailsValues } from './cart-item.styles';
import { CartItemT } from '../../store/cart/cart.types'

type CartItemsProps = {
    cartItem: CartItemT
}

const CartItem = memo(({ cartItem }: CartItemsProps) => {
    const { name, quantity, price, imageUrl } = cartItem
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <ItemDetailsValues>{ name }</ItemDetailsValues>
                <ItemDetailsValues>{ quantity } x ${price}</ItemDetailsValues>
            </ItemDetails>
        </CartItemContainer>
    )
})

export default CartItem;