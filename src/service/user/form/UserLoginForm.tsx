import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useToaster } from '../../../components/toaster/ToasterProvider';
import UserService from '../UserService';
import { handleError } from '../../../utils/error/ErrorHandler';
import { UserLoginFormData } from '../../../dto/user/UserLoginFormData';
import { useUserStore } from '../../../stores/user/UserStore';
import { useNavigate } from 'react-router-dom';

const UserLoginFormDataValidation = Yup.object({
    email: Yup.string()
        .required('Email must not be empty')
        .email('Email is not valid'),

    password: Yup.string()
        .required('Password must not be empty')
})

export const useLoginFormik = (
    setLoading: (loading: boolean) => void,
) => {

    const toaster = useToaster();
    const navigate = useNavigate();
    const user = useUserStore.getState();

    const handleFormSubmit = async (
        values: UserLoginFormData,
        formikHelpers: any
    ) => {
        setLoading(true);
        try {
            const response = await UserService.loginUser(values)
    
            if (response.status === 401) {
                toaster(response.data.message, 5000, 'error', 'filled');
            } else {
                formikHelpers.resetForm();
                user.newUser(
                    response.data.id,
                    response.data.firstName,
                    response.data.lastName,
                    response.data.email,
                    response.data.roles,
                    response.data.jwtToken
                );
                navigate('/home');
                console.log(user)
            }
        } catch (error) {
            toaster(handleError(error), 5000, 'error', 'filled');
        } finally {
            setLoading(false);
        }
    }

    return useFormik<UserLoginFormData>({
        initialValues: {
            email: '',
            password: ''
        },

        validationSchema: UserLoginFormDataValidation,

        onSubmit: async (values: UserLoginFormData, formikHelpers) => {
            handleFormSubmit(values, formikHelpers);
        }
    })
}