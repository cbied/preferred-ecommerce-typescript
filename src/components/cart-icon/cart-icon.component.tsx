import { CartIconContainer,
         ShoppingIconSvg,
         ItemCount } from './cart-icon.styles';
import { setToggleIsCartOpen } from '../../store/cart/cart.action'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';

const CartIcon = () => {
    const dispatch = useDispatch()
    const cartCount = useSelector(selectCartCount)
    const toggleCartOpen = useSelector(selectIsCartOpen)
    const toggleCartDropDown = () => dispatch(setToggleIsCartOpen(toggleCartOpen))

    return(
        <CartIconContainer onClick={toggleCartDropDown}>
            <ShoppingIconSvg className='shopping-icon'/>
             <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;