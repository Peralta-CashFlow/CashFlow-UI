import * as Yup from 'yup';
import { useFormik } from 'formik';
import UserService from '../../service/user/UserService';
import { useToaster } from '../../components/toaster/ToasterProvider';
import { AxiosError } from 'axios';

export interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

const RegisterFormDataValidation = Yup.object({
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

export const useRegisterFormik = (
    setLoading: (loading: boolean) => void,
    setOpenModal: (open: boolean) => void
) => {

    const toaster = useToaster();

    return useFormik<RegisterFormData>({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },

        validationSchema: RegisterFormDataValidation,

        onSubmit: async (values: RegisterFormData, formikHelpers) => {
            setLoading(true);
            try {
                await UserService.registerUser(values);
                setOpenModal(false);
                toaster('User registered successfully', 5000, 'success', 'filled');
                formikHelpers.resetForm();
            } catch (error) {
                if (error instanceof AxiosError) {
                    toaster(error.response? error.response.data.message : 'Server Error', 5000, 'error', 'filled');
                }
            }
            setLoading(false);
        }
    })
}