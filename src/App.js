import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/Shop/Shop.component';
import Header from './components/header/header.component';
import SignInUpPage from './pages/sign-in-up/sign-in-up.component';
import setCurretntUser from './redux/user/user.actions';


class App extends Component {
   
  unsubscribeFromAuth = null;

  //const {setCurretntUser} = this.props;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot =>{
          this.props.setCurretntUser({            
              id: snapshot.id,
              ...snapshot.data()            
          });
        });
      } else {
        this.props.setCurretntUser(userAuth);
      }
      
    });
  };

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
    
   
  render(){
    return (
      <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={ HomePage }/>
        <Route exact path='/shop' component={ ShopPage }/>
        <Route exact path='/sign in' render={ ()=> this.props.currentUser ? (<Redirect to='/' />)
        :(<SignInUpPage/>) }/>
      </Switch>
    </div>
    )
   
  }
    
  
}

const mapStateToProps = ({user})=>({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurretntUser: user => dispatch(setCurretntUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
