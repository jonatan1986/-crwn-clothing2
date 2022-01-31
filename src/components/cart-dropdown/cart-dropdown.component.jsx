import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import {connect} from 'react-redux';
import CartItem from "../cart-item/cart-item.component";
import {SelectCartItems} from '../../redux/cart/cart.selectors';
import { withRouter } from "react-router-dom";
import './cart-dropdown.styles.scss';
import { createStructuredSelector } from "reselect";
import { toggleCartHidden } from "../../redux/cart/cart.action";


const CartDropDown = ({cartItems,history,dispatch}) =>(
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.length ?
                cartItems.map(cartItem =>(<CartItem key={cartItem.id} item={cartItem} />)) :
                <span className='empty-message'>Your cart is empty</span>
        }
        </div>
        <CustomButton onClick={() => {
                                        history.push('/checkout');
                                        dispatch(toggleCartHidden());
                                     }}>
            GO TO CHECKOUT
        </CustomButton>
    </div>
)

// const mapStateToProps = (state) =>({
//     cartItems:SelectCartItems(state)
// });

const mapStateToProps = createStructuredSelector({
    cartItems:SelectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropDown));