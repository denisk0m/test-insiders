import {emailRegex, passwordRegex, userNameRegex} from "@/ui/components/forms/auth/regex";
import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
    email: Yup.string().matches(emailRegex.value, emailRegex.shortDescription).required('Required'),
    // password: Yup.string().matches(passwordRegex.value, passwordRegex.shortDescription).required('Required'),
    password: Yup.string().required('Required'),
});

export const registerValidationSchema = Yup.object({
    email: Yup.string().matches(emailRegex.value,emailRegex.shortDescription).email('Invalid email address').required('Required'),
    // username: Yup.string().matches(userNameRegex.value,userNameRegex.shortDescription).required('Required'),
    // password: Yup.string().matches(passwordRegex.value, passwordRegex.shortDescription).required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm your password'),
});


export const regInitialValues = {
    email: '',
    // username: '',
    password: '',
    confirmPassword: '',
};


export const loginInitialValues = {
    email: '',
    password: '',
};