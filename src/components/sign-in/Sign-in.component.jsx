import React, {useState} from "react";
import { connect } from 'react-redux';

import FormInput from '../form-input/Form-input.component';
import CustomButton from '../custom-button/Custom-button.component';
import "./sign-in.styles.scss";
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

const SignIn = ({emailSignInStart, googleSignInStart})=>{
  
  const [ credentials, setCredentials ] = useState({email:'', password:''})

  const { email, password } = credentials;

  const handleSubmit = async event =>{
    event.preventDefault();
    emailSignInStart(email, password);
  };
  
  const handleChange = event => {
    const { name, value } = event.target;
    setCredentials({...credentials, [name]: value });
  }  
    return (
      <div className="sign-in">
        <h2 className='title'>I already have an account</h2>
        <span>Sign in with your email and password</span>
        
        <form onSubmit={handleSubmit}>
          
          <FormInput 
            handleChange={handleChange}
            type="email" 
            name="email" 
            label='email'
            value={email} required
          />
           
          <FormInput 
            handleChange={handleChange}
            type="password" 
            name="password" 
            value={password}
            label="password"
            required 
          />
          <div className="buttons">
            <CustomButton type="submit">Sign in</CustomButton>
            <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>Sign in with Google</CustomButton>
          </div>

        </form>
      </div>
    );
  
}

const mapDispatchToProps = dispatch =>({
  googleSignInStart: ()=> dispatch(googleSignInStart()),
  emailSignInStart: (email, password)=> dispatch(emailSignInStart({email, password}))
});

export default connect(null,mapDispatchToProps)(SignIn);
