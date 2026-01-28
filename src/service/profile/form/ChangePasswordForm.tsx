import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Severity, useToaster, Variant } from '../../../components/toaster/ToasterProvider';
import { useInternationalizationStore } from '../../../stores/internationalization/InternationalizationStore';
import { useUserStore } from '../../../stores/user/UserStore';
import { passwordRegex } from '../../../utils/text/TextUtil';
import { handleError } from '../../../utils/error/ErrorHandler';
import { ChangePasswordFormData } from '../../../dto/profile/ChangePasswordFormData';
import { useFormik } from 'formik';
import ProfileService from '../ProfileService';

export const useChangePasswordFormik = (
    setLoading: (loading: boolean) => void,
    setPasswordEditing: (editing: boolean) => void
) => {

    const { t } = useTranslation();
    const toaster = useToaster();
    const internationalization = useInternationalizationStore();
    const user = useUserStore().user;

    const ChangePasswordFormDataValidation = Yup.object({
        oldPassword: Yup.string()
            .required(t('password-not-empty')),

        newPassword: Yup.string()
            .required(t('password-not-empty'))
            .matches(
                passwordRegex,
                t('password-regex')
            )
    })

    const handleFormSubmit = async (
        values: ChangePasswordFormData,
        formikHelpers: any,
        setLoading: (loading: boolean) => void,
        toaster: (message: string, autoHideDuration?: number, severity?: Severity, variant?: Variant) => void
    ) => {
        setLoading(true);
        try {
            values.userId = user.id;
            await ProfileService.changePassword(
                internationalization.language,
                values,
                user
            );
            toaster(t('password-updated-success'), 5000, 'success', 'filled');
            formikHelpers.resetForm();
            setPasswordEditing(false);
        } catch (error) {
            toaster(handleError(error), 5000, 'error', 'filled');
        }
        setLoading(false);
    }

    return useFormik<ChangePasswordFormData>({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            userId: 0
        },

        validationSchema: ChangePasswordFormDataValidation,

        onSubmit: (values:ChangePasswordFormData, formikHelpers) => {
            handleFormSubmit(values, formikHelpers, setLoading, toaster);
        }
    })
}