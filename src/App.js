import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header  from './components/header/header.component';
import { connect } from 'react-redux';
import {selectCurrentUser}  from './redux/user/user.selectors';
import { createStructuredSelector } from "reselect";
import { selectCollectionForPreview } from './redux/shop/shop.selectors';
import { checkUserSession } from './redux/user/user.actions';

// const HatsPage = () => (
//   <div>
//     <h1>HATS PAGE </h1>
//   </div>
// );

class  App extends React.Component {
  // constructor(){ // this code is not neccessary for redux
  //   super();
  //   this.state = {
  //     currentUser:null
  //   }
  // }

  unsubscribeFromAuth = null;

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  componentDidMount(){
    const {checkUserSession} = this.props;
    checkUserSession();
  }

  render() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/sign-in' 
        render={ () =>
        this.props.currentUser ?
        (<Redirect to='/' />
        ):(
        <SignInAndSignUpPage/>)

          }/>
      </Switch>
    </div>
  );
  }
}


// const mapStateToProps = ({user}) =>({
//   currentUser:user.currentUser
// })

// note - 18/2/2022 - if this function doesnt work, the once above does
const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser
  // ,collectionsArray:selectCollectionForPreview
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);