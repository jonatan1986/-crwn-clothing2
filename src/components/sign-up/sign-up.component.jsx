import React from "react";
import './sign-up.styles.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { signUpStart } from "../../redux/user/user.actions";
import { connect } from "react-redux";
// import { auth,createUserProfieDocument } from "../../firebase/firebase.utils";

class SignUp extends React.Component{
    constructor(){
        super();
        this.state = {
            displayName:'',
            password:'',
            email:'',
            confirmPassword:''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {signUpStart} = this.props;
        const {displayName,password,email,confirmPassword} = this.state;
        

        if (password !== confirmPassword)
        {
            alert('passwords dont match');
            return;
        }
        
        signUpStart({displayName,email,password})       
        // try{
        //     const {user} = await auth.createUserWithEmailAndPassword(email,password);
        //     await createUserProfieDocument(user,{displayName});
            // this.setState({ // lesson 213 - after sign up ser is also signed in 
            //     displayName:'', // so this.state is not necessary
            //     password:'',
            //     email:'',
            //     confirmPassword:''
            // });
        // }
        // catch(error)
        // {
        //     console.error(error);
        // }
    }
    
    handleChange = async event =>{
         const {name,value} = event.target;
         this.setState({
             [name]:value
         })
    }

    render(){
        const {displayName,password,email,confirmPassword} = this.state;
        return(
            <div className="sign-up">
                <h2 className="title" > I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput type='text' name='displayName' value = {displayName} 
                    onChange={this.handleChange} label='Display Name' required />
                    <FormInput type='email' name='email' value = {email} 
                    onChange={this.handleChange} label='Email' required />
                    <FormInput type='password' name='password' value = {password} 
                    onChange={this.handleChange} label='Password' required />
                    <FormInput type='password' name='confirmPassword' value = {confirmPassword} 
                    onChange={this.handleChange} label='Confirm password' required />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                  
                </form>
            </div>
        );
    }

}

const mapDispatchToProps = dispatch =>({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

 export default connect(null,mapDispatchToProps)(SignUp);
// export default SignUp;