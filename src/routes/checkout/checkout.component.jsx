import { Fragment } from "react";
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckout from '../../components/stripe-checkout/stripe-checkout.component';
import { CheckoutContainer,
         CheckoutHeader,
         HeaderBlock,
         NoItemsInCart,
         Total } from './checkout.styles';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';


const Checkout = () => {
  const cartTotal = useSelector(selectCartTotal)
  const cartItems = useSelector(selectCartItems)

    return(
      <Fragment>
        <CheckoutContainer>
        <CheckoutHeader>
          <HeaderBlock>
            <span>Product</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Description</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Quantity</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Price</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Remove</span>
          </HeaderBlock>
        </CheckoutHeader>
        {cartItems.length ? cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))
          :
          <NoItemsInCart>No Items in cart</NoItemsInCart>
      }
        <Total>TOTAL: ${cartTotal}</Total>
        <StripeCheckout />
        </CheckoutContainer>


      </Fragment>
    )
}

export default Checkout;