import React from "react";
import {Link} from "react-router-dom";
import './header.styles.scss';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {auth} from '../../firebase/firebase.utils';
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropDown from "../cart-dropdown/cart-dropdown.component";
import { SelectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { LogoContainer,OptionDiv,OptionLink,OptionsContainer,HeaderContainer } from "./header.styles";

const Header = ({currentUser,hidden}) =>
(
    <HeaderContainer>
        <LogoContainer to='/'>
        <Logo className='logo'/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/shop'>
                CONTACT
            </OptionLink>
            {currentUser ? (
                <OptionDiv onClick={()=> auth.signOut()}>SIGN OUT</OptionDiv>
                ):(
                <OptionLink to='/sign-in'>SIGN IN</OptionLink>)}
            <CartIcon/>
        </OptionsContainer>
        {
            hidden?
            null:<CartDropDown/>
        }
        
    </HeaderContainer>
)


const mapStateToProps = createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden: SelectCartHidden
});

export default connect(mapStateToProps)(Header);
