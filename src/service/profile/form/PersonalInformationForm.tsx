import * as Yup from 'yup';
import { useFormik } from 'formik';
import { handleError } from '../../../utils/error/ErrorHandler';
import { Severity, Variant, useToaster } from '../../../components/toaster/ToasterProvider';
import { useTranslation } from "react-i18next";
import { PersonalInformationFormData } from '../../../dto/profile/PersonalInformationFormData';

export const usePersonalInformationFormik = (
    setLoading: (loading: boolean) => void
) => {

    const { t } = useTranslation();
    const toaster = useToaster();

    const PersonalInformationFormDataValidation = Yup.object({
        firstName: Yup.string()
            .required(t('first-name-not-empty'))
            .max(30, t('first-name-max-char')),

        lastName: Yup.string()
            .required(t('last-name-not-empty'))
            .max(30, t('last-name-max-char')),

        taxNumber: Yup.string()
            .max(11, t('tax-number-char'))
            .min(11, t('tax-number-char'))
    })

    const handleFormSubmit = async (
        values: PersonalInformationFormData,
        setLoading: (loading: boolean) => void,
        toaster: (message: string, autoHideDuration?: number, severity?: Severity, variant?: Variant) => void
    ) => {
        setLoading(true);
        try {
            //TBD Implementation of edit service call
            toaster(t('edit-personal-information-success'), 5000, 'success', 'filled');
        } catch (error) {
            toaster(handleError(error), 5000, 'error', 'filled');
        }
        setLoading(false);
    }

    return useFormik<PersonalInformationFormData>({
        initialValues: {
            avatar: '',
            firstName: '',
            lastName: '',
            gender: '',
            birthDate: '',
            taxNumber: ''
        },

        validationSchema: PersonalInformationFormDataValidation,

        onSubmit: (values: PersonalInformationFormData) => {
            handleFormSubmit(values, setLoading, toaster);
        }
    })

}