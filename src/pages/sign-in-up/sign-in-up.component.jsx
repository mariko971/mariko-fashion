import React from 'react';
import './sign-in-up.styles.scss';
import SignIn from '../../components/sign-in/Sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

const SignInUpPage = ()=>(
    <div className="sign-in-up">
        <SignIn/>
        <SignUp/>
    </div>
);

export default SignInUpPage;