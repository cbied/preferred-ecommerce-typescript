import { CartItemContainer,
         ItemDetails,
         ItemDetailsValues } from './cart-item.styles';

export type CartItemT = {
    name: string,
    quantity: number,
    price: number,
    imageUrl: string,
}

type CartItemsProps = {
    cartItem: CartItemT
}

const CartItem = ({ cartItem }: CartItemsProps) => {
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
}

export default CartItem;