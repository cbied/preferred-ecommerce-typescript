import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { ProductCardContainer,
         Footer, Name, Price } from './product-card.styles'
import { useDispatch, useSelector } from 'react-redux'
import { setAddItemToCart } from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector'

const ProductCard = ({ product }) => {
    const { id, name, price, imageUrl } = product
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)

    const addProductToCart = () => dispatch(setAddItemToCart(product, cartItems))
    
    return(
        <ProductCardContainer key={id}>
            <img src={imageUrl} alt={`${name}`}/>
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to Cart</Button>
        </ProductCardContainer>
    )
}

export default ProductCard