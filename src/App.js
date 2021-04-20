import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/Shop/Shop.component';
import Header from './components/header/header.component';
import SignInUpPage from './pages/sign-in-up/sign-in-up.component';
import { useEffect, useState } from 'react';
import { auth } from './firebase/firebase.utils';
function App() {
  const  [ currentUser, setCurrentUser ]  = useState();

  
  useEffect(()=>{
    let unsubscribeFromAuth = auth.onAuthStateChanged(user => setCurrentUser(user));
    console.log(currentUser);
    //return this.unsubscribeFromAuth();
  });
    
   
  return (
    <div>
      <Header currentUser={ currentUser }/>
      <Switch>
        <Route exact path='/' component={ HomePage }/>
        <Route exact path='/shop' component={ ShopPage }/>
        <Route exact path='/sign in' component={ SignInUpPage }/>
      </Switch>
    </div>
  );
}

export default App;
