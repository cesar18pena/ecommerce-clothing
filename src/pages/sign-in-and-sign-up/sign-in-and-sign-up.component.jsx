import React from 'react';
import SignIn from '../../components/sign-in/sign-in.component';
import SIgnUp from '../../components/sign-up/sign-up.component';

import './sign-in-and-sign-up.styles.scss';

const SignInAndSignUpPage = (props) => (
  <div className='sign-in-and-sign-up'>
    <SignIn />
    <SIgnUp />
  </div>
);

export default SignInAndSignUpPage;
