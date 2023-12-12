import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import LoadingPage from '../loading-page/loading-page.componet'
import { SignUpContainer, H2 } from './sign-up-form.styles';
import { useDispatch, useSelector } from "react-redux";
import { selectUserLoading } from '../../store/user/user.selector';
import { signUpUserStart } from '../../store/user/user.action';

const defualtFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const SignUpForm = () => {
    const [ formFields, setFormFields ] = useState(defualtFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const isLoading = useSelector(selectUserLoading)
    const dispatch = useDispatch()
    
    
    const submitForm = async (event) => {
        event.preventDefault();

        // if password does not match confirm password, kick back to user
        if(password !== confirmPassword) {
            alert("Passwords do not match")
            return
        } 

        setFormFields({...formFields})
        dispatch(signUpUserStart(email, password, displayName))
        setFormFields(defualtFormFields)
    }

    // update form fields
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    }

    return(
        <SignUpContainer>
        <LoadingPage isLoading={isLoading} />
            <H2>Don't have an account?</H2>
            <span>Sign up with your email and password</span>
            <form onSubmit={submitForm}>
                <FormInput  label="Display Name: " 
                            type="text" 
                            onChange={handleChange} 
                            name="displayName"
                            value={displayName}
                            required/>
            
                <FormInput  label="Email: " 
                            type="email" 
                            onChange={handleChange} 
                            name="email"
                            value={email}
                            required/>
            
                <FormInput  label="Password: " 
                            type="password" 
                            onChange={handleChange} 
                            name="password"
                            value={password}
                            required/>

                <FormInput  label="Confirm Password: " 
                            type="password" 
                            onChange={handleChange} 
                            name="confirmPassword"
                            value={confirmPassword}
                            required/>
                <Button type="submit">
                    Submit
                </Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;