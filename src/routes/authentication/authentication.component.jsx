import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in/sign-in-form.component";
import { AuthenticatonContainer } from './authentication.styles'

const Authenication = () => {
    return (
        <AuthenticatonContainer>
            <SignInForm />
            <SignUpForm />
        </AuthenticatonContainer>
    )
}

export default Authenication;