import * as Yup from 'yup';
import { useFormik } from 'formik';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

const RegisterFormData = Yup.object({
    firstName: Yup.string()
        .required('First name must not be empty')
        .max(30, 'First name must have at most 30 characters'),

    lastName: Yup.string()
        .required('Last name must not be empty')
        .max(30, 'Last name must have at most 30 characters'),

    email: Yup.string()
        .required('Email must not be empty')
        .email('Email is not valid')
        .max(100, 'Email must have at most 100 characters'),

    password: Yup.string()
        .required('Password must not be empty')
        .matches(
            passwordRegex,
            'Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
        )
})

export const useRegisterFormik = () => useFormik({
    initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    },
    validationSchema: RegisterFormData,
    onSubmit: (values) => {
        console.log(values);
    }
})