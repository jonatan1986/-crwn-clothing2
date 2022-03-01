import React from "react";
import './sign-in.styles.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {signInWithGoogle,auth} from "../../firebase/firebase.utils";

import { googleSignInStart,emailSignInStart } from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { useState } from "react";

const SignIn = ({emailSignInStart,googleSignInStart}) => {

    const [userCredentials,setCredentials] = useState({email:'',password:''})
    const {email,password} = userCredentials;
    const handleSubmit = async event => {
        event.preventDefault();
        
        emailSignInStart(email,password);
    }

    const handleChange = event => {
        const { name,value} = event.target;
        
        setCredentials({...userCredentials,[name]:value})
    }

    return(
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput name="email" label='email' type="email" value={email} handleChange={handleChange} required />
                <FormInput name="password" type="password" value={password}  label='password' handleChange={handleChange} required />
                <CustomButton type="submit">Sign in</CustomButton>
                <CustomButton  type="button" onClick={googleSignInStart} isGoogleSignIn>
                    {''}
                    Sign in with Google{''}
                </CustomButton>
            </form>
        </div>
    );
}


const mapDispatchToProps = dispatch =>({
    googleSignInStart:() => dispatch(googleSignInStart()),
    emailSignInStart:(email,password) => dispatch(emailSignInStart({email,password}))
})

// export default SignIn;

export default connect(null,mapDispatchToProps)(SignIn);