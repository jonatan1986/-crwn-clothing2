import React from "react";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import './cart-icon.styles.scss';
import {SelectCartItemsCount} from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from "reselect";

import {connect} from 'react-redux';
import { toggleCartHidden } from "../../redux/cart/cart.action";


const CartIcon = ({toggleCartHidden,itemCount}) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingIcon className="shopping-icon"/>
        <span className="item-count">{itemCount}</span>
    </div>)


// const mapStateToProps = state =>({
//     itemCount: SelectCartItemsCount(state)
// })

const mapStateToProps = createStructuredSelector({
    itemCount: SelectCartItemsCount
})


const mapDispatchToProps = dispatch =>
({
    toggleCartHidden : () => dispatch(toggleCartHidden())
})


export default connect(mapStateToProps,mapDispatchToProps)(CartIcon);