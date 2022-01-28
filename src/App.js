import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header  from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth,createUserProfieDocument} from './firebase/firebase.utils';

// const HatsPage = () => (
//   <div>
//     <h1>HATS PAGE </h1>
//   </div>
// );

class  App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser:null
    }
  }

  unsubscribeFromAuth = null;

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({currentUser:user})
      if (userAuth)
      {
        const userRef = await createUserProfieDocument(userAuth)
        userRef.onSnapshot(snapshot =>{
          // console.log(snapshot.data());
          this.setState({
            currentUser:{
              id:snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }
      this.setState({
        currentUser:userAuth
      })
    })
  }

  render() {
  return (
    <div>
      <Header currentUser = {this.state.currentUser}/>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/sign-in' component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
  }
}


export default App;