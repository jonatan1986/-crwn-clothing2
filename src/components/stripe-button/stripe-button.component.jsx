import React from "react";
import StripeCheckout from 'react-stripe-checkout';




const StripeCheckoutButton = ({price})=>
{
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51KQQOkCjyVJd7MBEHql1lIqlDBoAgdRNGQ3annPBW0dOEmpzOcCXgqObMqpaWW3BsB1c3qniX20AnxlT3RTxyrEb00e5rPtEqN';
    const onToken = token =>
    {
        console.log(token);
        alert('Patment Successful')
    }
    return(
        <StripeCheckout label="Pay Now" 
        name="CRWN Clothing Ltd."
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg' 
        description={`total price $${price}`}
        amount={priceForStripe}
        panelLabel="Pay Now"
        token={onToken}
        stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;