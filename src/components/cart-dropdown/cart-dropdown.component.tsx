import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectCartItems, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setToggleIsCartOpen } from '../../store/cart/cart.action'
import { useDispatch } from 'react-redux';
import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';
import { CartDropdownContainer,
         EmptyMessage,
         CartItems } from './cart-dropdown.styles';

const CartDropdown = () => {
    const dispatch = useDispatch()
    const toggleCartOpen = useSelector(selectIsCartOpen)
    const cartItems = useSelector(selectCartItems)
    const toggleCartDropDown = () => dispatch(setToggleIsCartOpen(toggleCartOpen))
    
    return(
        <CartDropdownContainer>
            <CartItems>
                { 
                    cartItems &&
                    cartItems.length ?
                    cartItems.map(item => <CartItem key={item.id} cartItem={item} />)
                    :
                    <EmptyMessage>No Cart Items</EmptyMessage>
                }
            </CartItems>
            <Link to="/checkout">       
            <Button onClick={toggleCartDropDown}>Go to Checkout</Button>
            </Link>
        </CartDropdownContainer>
    )
}

export default CartDropdown;