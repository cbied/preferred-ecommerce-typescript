import { useState, Fragment } from "react";
import FormInput from '../form-input/form-input.component'
import LoadingPage from '../loading-page/loading-page.componet'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { selectUserLoading } from '../../store/user/user.selector'
import { SignInContainer, H2, ButtonsContainer } from './sign-in-form.styles'
import { emailSignInStart, googleSignInStart } from '../../store/user/user.action'
import { useDispatch, useSelector } from 'react-redux';

const defualtFormFields = {
    email: "",
    password: "",
}


const SignInForm = () => {
    const [ formFields, setFormFields ] = useState(defualtFormFields);
    const { email, password } = formFields;
    const isLoading = useSelector(selectUserLoading)
    const dispatch = useDispatch()
    
    // update form fields
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const loginGoogleUserPopup = async () => {
        dispatch(googleSignInStart())
    }

    const submitForm = async (event) => {
        event.preventDefault();
        // try to authenticate user with firebase through redux saga
        dispatch(emailSignInStart(email, password))
        // reset form fields
        setFormFields(defualtFormFields)
    }

    return(
        <Fragment>
        {
            isLoading ? 
            <LoadingPage isLoading={isLoading}/>
            :
            <SignInContainer>
                <H2>I already have an account</H2>
                <span>Sign in with your email and password</span>
                <form onSubmit={submitForm}>
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
                    <ButtonsContainer>
                        <Button type="submit">
                            Sign In
                        </Button>
                        <Button type="button" onClick={loginGoogleUserPopup} buttonType={BUTTON_TYPE_CLASSES.google}>
                            Google Sign In
                        </Button>
                    </ButtonsContainer>
                </form>
            </SignInContainer>         
        }
        </Fragment>
    )
}

export default SignInForm