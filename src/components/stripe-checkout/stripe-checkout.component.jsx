import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectCartTotal } from '../../store/cart/cart.selector'
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { StripeContainer, FormContainer } from './stripe-checkout.styles'

const StripeCheckout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const user = useSelector(selectCurrentUser)
  const cartTotal = useSelector(selectCartTotal)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
        console.log("no stripe or elements found")
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: cartTotal * 100 }),
    })
    .then((res) => res.json())
    .catch(error => {
      console.log(error)
      alert('Payment did not go through')
      setIsProcessingPayment(false);
    })
    
    let clientSercret;
    let paymentResult;
    if(response) {
    clientSercret = response.paymentIntent.client_secret

    paymentResult = await stripe.confirmCardPayment(clientSercret, {
    payment_method: {
      card: elements.getElement(CardElement),
      billing_details: {
        name: user ? user.displayName : 'guest'
      }
    }
  })
  }

  if(paymentResult && paymentResult?.error) {
    alert(paymentResult.error.message)
  } else {
    if(paymentResult && paymentResult?.paymentIntent.status === 'succeeded') {
      alert("Payment Successful")
    }
  }

    setIsProcessingPayment(false);
  };

  return (
    <StripeContainer>
        <FormContainer onSubmit={handleSubmit}>
            <CardElement/>
            { !stripe || !elements ?

              <Button buttonType={BUTTON_TYPE_CLASSES.disabled}>oops, something is wrong</Button>
              :
              <Button buttonType={BUTTON_TYPE_CLASSES.inverted} isLoading={isProcessingPayment}>Pay now</Button>

            }
        </FormContainer>
    </StripeContainer>
  );
}

export default StripeCheckout;