import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useToaster } from '../../../components/toaster/ToasterProvider';
import UserService from '../UserService';
import { handleError } from '../../../utils/error/ErrorHandler';
import { UserLoginFormData } from '../../../dto/user/UserLoginFormData';

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

    return useFormik<UserLoginFormData>({
        initialValues: {
            email: '',
            password: ''
        },

        validationSchema: UserLoginFormDataValidation,

        onSubmit: async (values: UserLoginFormData, formikHelpers) => {
            setLoading(true);
            try {
                const response = await UserService.loginUser(values)

                if (response.status === 401) {
                    toaster(response.data.message, 5000, 'error', 'filled');
                } else {
                    formikHelpers.resetForm();
                    toaster('Success', 5000, 'success', 'filled');
                }

            } catch (error) {
                toaster(handleError(error), 5000, 'error', 'filled');
            } finally {
                setLoading(false);
            }
        }
    })
}