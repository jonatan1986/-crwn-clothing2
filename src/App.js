import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header  from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth,createUserProfieDocument} from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';

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
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({currentUser:user})
      if (userAuth)
      {
        const userRef = await createUserProfieDocument(userAuth)
        userRef.onSnapshot(snapshot =>{
          // console.log(snapshot.data());
          // this.setState({  //this code is not relevant for redux
            // currentUser:{ 
            setCurrentUser({
              id:snapshot.id,
              ...snapshot.data()
          })
        })
      }
      // this.setState({ //this code is not relevant for redux
      //   currentUser:userAuth
      // })
      setCurrentUser(userAuth);
    })
  }

  render() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/sign-in' component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
  }
}


const mapDispathToProps = dispatch=>({
  // whatever is passed to "dispatch" in the following line is an action object that will be passed to every reducer
  // the arguments are : call back function "setCurrentUser"  and user arguments from user.action.js
  setCurrentUser:user=>dispatch(setCurrentUser(user))
});

export default connect(null,mapDispathToProps)(App);