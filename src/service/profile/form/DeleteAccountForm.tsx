import { useTranslation } from "react-i18next";
import { Severity, useToaster, Variant } from "../../../components/toaster/ToasterProvider";
import { useInternationalizationStore } from "../../../stores/internationalization/InternationalizationStore";
import { useUserStore } from "../../../stores/user/UserStore";
import * as Yup from 'yup';
import { DeleteAccountFormData } from "../../../dto/profile/DeleteAccountFormData";
import ProfileService from "../ProfileService";
import { handleError } from "../../../utils/error/ErrorHandler";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';

export const useDeleteAccountFormik = (
    setLoading: (loading: boolean) => void
) => {

    const { t } = useTranslation();
    const toaster = useToaster();
    const internationalization = useInternationalizationStore();
    const user = useUserStore();
    const navigate = useNavigate();

    const DeleteAccountFormDataValidation = Yup.object({
        password: Yup.string()
            .required(t('password-not-empty'))
    })

    const handleFormSubmit = async (
        values: DeleteAccountFormData,
        formikHelpers: any,
        setLoading: (loading: boolean) => void,
        toaster: (message: string, autoHideDuration?: number, severity?: Severity, variant?: Variant) => void
    ) => {
        setLoading(true);
        try {
            values.userId = user.user.id;
            await ProfileService.deleteAccount(
                internationalization.language,
                values,
                user.user
            );
            formikHelpers.resetForm();
            useUserStore.setState(useUserStore.getInitialState);
            navigate('/');
            toaster(t('delete-account-success'), 5000, 'success', 'filled');
        } catch (error) {
            toaster(handleError(error), 5000, 'error', 'filled');
        }
        setLoading(false);
    }

    return useFormik<DeleteAccountFormData>({
        initialValues: {
            userId: 0,
            password: ''
        },

        validationSchema: DeleteAccountFormDataValidation,

        onSubmit: (values: DeleteAccountFormData, formikHelpers) => {
            handleFormSubmit(values, formikHelpers, setLoading, toaster);
        }
    })

}