import * as Yup from 'yup';
import { useFormik } from 'formik';
import UserService from '../../../service/user/UserService';
import { handleError } from '../../../utils/error/ErrorHandler';
import { UserRegisterFormData } from '../../../dto/user/UserRegisterFormData';
import { Severity, Variant, useToaster } from '../../../components/toaster/ToasterProvider';
import { useTranslation } from 'react-i18next';
import { useInternationalizationStore } from '../../../stores/internationalization/InternationalizationStore';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

export const useRegisterFormik = (
    setLoading: (loading: boolean) => void,
    setOpenModal: (open: boolean) => void
) => {

    const toaster = useToaster();
    const { t } = useTranslation();
    const internationalization = useInternationalizationStore();

    const RegisterFormDataValidation = Yup.object({
        firstName: Yup.string()
            .required(t('first-name-not-empty'))
            .max(30, t('first-name-max-char')),

        lastName: Yup.string()
            .required(t('last-name-not-empty'))
            .max(30, t('last-name-max-char')),

        email: Yup.string()
            .required(t('email-not-empty'))
            .email(t('email-not-valid'))
            .max(100, t('email-max-char')),

        password: Yup.string()
            .required(t('password-not-empty'))
            .matches(
                passwordRegex,
                t('password-regex')
            )
    })

    const handleFormSubmit = async (
        values: UserRegisterFormData,
        formikHelpers: any,
        setLoading: (loading: boolean) => void,
        setOpenModal: (open: boolean) => void,
        toaster: (message: string, autoHideDuration?: number, severity?: Severity, variant?: Variant) => void
    ) => {
        setLoading(true);
        try {
            await UserService.registerUser(values, internationalization.language);
            setOpenModal(false);
            toaster('User registered successfully', 5000, 'success', 'filled');
            formikHelpers.resetForm();
        } catch (error) {
            toaster(handleError(error), 5000, 'error', 'filled');
        }
        setLoading(false);
    };

    return useFormik<UserRegisterFormData>({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },

        validationSchema: RegisterFormDataValidation,

        onSubmit: (values: UserRegisterFormData, formikHelpers) => {
            handleFormSubmit(values, formikHelpers, setLoading, setOpenModal, toaster);
        }
    })
}