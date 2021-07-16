import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/Shop/Shop.component';
import SignInUpPage from './pages/sign-in-up/sign-in-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';


class App extends Component {
  unSubscribeFromAuth = null;
  componentDidMount(){
    const { checkUserSession } = this.props;
    checkUserSession();
  };

  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }
     
   
  render(){
    const {currentUser} = this.props;
    console.log(`currentUser is ${currentUser}`)
    return (
      <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={ HomePage }/>
        <Route path='/shop' component={ ShopPage }/>
        <Route exact path='/checkout' component={ CheckoutPage }/>
        <Route exact path='/sign in' render={ ()=> currentUser ? (<Redirect to='/' />)
        :(<SignInUpPage/>) }/>
      </Switch>
    </div>
    )
   
  }
    
  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: ()=> dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
