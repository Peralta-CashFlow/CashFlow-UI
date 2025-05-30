import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useToaster } from '../../../components/toaster/ToasterProvider';
import UserService from '../UserService';
import { handleError } from '../../../utils/error/ErrorHandler';
import { UserLoginFormData } from '../../../dto/user/UserLoginFormData';
import { useUserStore } from '../../../stores/user/UserStore';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useInternationalizationStore } from '../../../stores/internationalization/InternationalizationStore';

export const useLoginFormik = (
    setLoading: (loading: boolean) => void,
) => {

    const { t } = useTranslation();
    const internationalization = useInternationalizationStore();

    const UserLoginFormDataValidation = Yup.object({
        email: Yup.string()
            .required(t('email-not-empty'))
            .email(t('email-not-valid')),

        password: Yup.string()
            .required(t('password-not-empty'))
    })

    const toaster = useToaster();
    const navigate = useNavigate();
    const user = useUserStore.getState();

    const handleFormSubmit = async (
        values: UserLoginFormData,
        formikHelpers: any
    ) => {
        setLoading(true);
        try {
            const response = await UserService.loginUser(values, internationalization.language);

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