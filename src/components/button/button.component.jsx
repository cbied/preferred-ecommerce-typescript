import { BaseButton,
         GoogleSignInButton,
         InvertedButton,
         DisabledButton,
         ButtonSpinner } from './button.styles'

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    inverted: 'inverted',
    google: 'google',
    disabled: 'disabled',
}

const getButtonType = (buttonType = BUTTON_TYPE_CLASSES.base) => 
({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.disabled]: DisabledButton
    }[buttonType]);

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
    const CustomButton = getButtonType(buttonType)
    return <CustomButton disabled={isLoading} {...otherProps}> 
    { isLoading ?
        <ButtonSpinner /> 
        :
        children } 
    </CustomButton>
}

export default Button