import { CheckoutItemContainer,
         ImageContainer,
         CartItemValues,
         Quantity,
         Arrow,
         Value,
         RemoveButton} from './checkout-item.styles';
import { useDispatch, useSelector } from 'react-redux';
import { setAddItemToCart, setClearItemFromCart, setSubtractItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

const CheckoutcartItem = ({ cartItem }) => {
    const dispatch = useDispatch()
    const { name, quantity, price, imageUrl } = cartItem;
    const cartItems = useSelector(selectCartItems)
    

    const handleQuantityUpdateIncrease = () => dispatch(setAddItemToCart(cartItem, cartItems))
    const handleQuantityUpdateDecrease = () => dispatch(setSubtractItemFromCart(cartItem, cartItems))
    const handleRemoveProductFromCart = () => dispatch(setClearItemFromCart(cartItem, cartItems))

    return(
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={ imageUrl } alt={ name } />
            </ImageContainer>
            <CartItemValues>{ name }</CartItemValues>

            <Quantity>
                <Arrow onClick={handleQuantityUpdateDecrease}> 
                    &#10094; 
                </Arrow>
                <Value>{ quantity }</Value>
                
            
                <Arrow onClick={handleQuantityUpdateIncrease}> 
                    &#10095; 
                </Arrow>
            </Quantity>
            
            <CartItemValues>{ price }</CartItemValues>
            
            <RemoveButton onClick={handleRemoveProductFromCart}>
                &#10005;
            </RemoveButton>
        </CheckoutItemContainer>  
    )
}

export default CheckoutcartItem;