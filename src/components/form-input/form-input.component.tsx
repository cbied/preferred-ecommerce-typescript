import { InputHTMLAttributes } from 'react';
import { Group, FormInputLabel, Input } from './form.input.styles'

export type OtherProps = {
    type: string;
    name: string;
    value: string,
    required: boolean
}

export type FormInputProps = {
    label: string;
} & InputHTMLAttributes<HTMLInputElement> 

const FormInput = ({ label, ...otherProps }: FormInputProps) => {
    return (
        <Group>
            <Input {...otherProps}/>
            {label ? 
                <FormInputLabel 
                shrink={
                    Boolean(otherProps.value && 
                        typeof otherProps.value === 'string' && 
                        otherProps.value.length)
                    }>{ label }</FormInputLabel>
            : null
            }
        </Group>
    )
}

export default FormInput