import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/Shop/Shop.component';
import Header from './components/header/header.component';
import SignInUpPage from './pages/sign-in-up/sign-in-up.component';
//import { useEffect, useState } from 'react';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends Component {
  constructor(){
    super();
    this.state = { 
      currentUser: null 
    }
  }
  
  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot =>{
          this.setState({
            currentUser : {
              id: snapshot.id,
              ...snapshot.data()
            }
          }, ()=> console.log(this.state));
        });
      } else {
        this.setState({currentUser: userAuth});
      }
      
    });
  };

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
    
   
  render(){
    return (
      <div>
      <Header currentUser={ this.state.currentUser }/>
      <Switch>
        <Route exact path='/' component={ HomePage }/>
        <Route exact path='/shop' component={ ShopPage }/>
        <Route exact path='/sign in' component={ SignInUpPage }/>
      </Switch>
    </div>
    )
   
  }
    
  
}

export default App;
