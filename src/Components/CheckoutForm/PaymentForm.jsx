import React from 'react'
import Review from './Review'
import { Divider, Button, Typography } from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51PtWTO08mMlWey03lFFz5Md6NpW7wD7oGWCUmSJiVlPEZptVcW6atJdSfnweVhiaISvjBwJTlFnoHmqnWqtmHWSx002kULO5gt');

const PaymentForm = ({ shippingData, checkoutToken, backStep, onCaptureCheckOut, nextStep }) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if (error) {
      console.log('[error]', error);
    } else {
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
        shipping: { name: 'International', street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      onCaptureCheckOut(checkoutToken.id, orderData);
      nextStep();
    }
  };
  return (
    <div>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant='h6' gutterBottom style={{ margin: "20px 0" }}>Payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /><br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button type='button' onClick={backStep} variant='contained' color='secondary'>
                  Back
                </Button>
                <Button type='submit' variant='contained' color='primary' disabled={!stripe}>
                  Pay {checkoutToken.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  )
}

export default PaymentForm