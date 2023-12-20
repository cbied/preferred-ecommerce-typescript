import { ButtonHTMLAttributes } from 'react';

import { BaseButton,
         GoogleSignInButton,
         InvertedButton,
         DisabledButton,
         ButtonSpinner } from './button.styles';

export enum BUTTON_TYPE_CLASSES {
    base = 'base',
    inverted = 'inverted',
    google = 'google',
    disabled = 'disabled',
}

export type ButtonProps = {
    buttonType?: BUTTON_TYPE_CLASSES;
    isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const getButtonType = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton => 
({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.disabled]: DisabledButton
    }[buttonType]);

const Button = ({ children, buttonType, isLoading, ...otherProps }: ButtonProps) => {
    const CustomButton = getButtonType(buttonType)
    return <CustomButton disabled={isLoading} {...otherProps}> 
    { isLoading ?
        <ButtonSpinner /> 
        :
        children } 
    </CustomButton>
}

export default Button