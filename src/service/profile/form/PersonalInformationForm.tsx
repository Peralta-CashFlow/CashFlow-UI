import * as Yup from 'yup';
import { useFormik } from 'formik';
import { handleError } from '../../../utils/error/ErrorHandler';
import { Severity, Variant, useToaster } from '../../../components/toaster/ToasterProvider';
import { useTranslation } from "react-i18next";
import { PersonalInformationFormData } from '../../../dto/profile/PersonalInformationFormData';
import ProfileService from '../ProfileService';
import { useInternationalizationStore } from '../../../stores/internationalization/InternationalizationStore';
import { useUserStore } from '../../../stores/user/UserStore';
import { formatDateToScreen } from '../../../utils/date/DateHandler';

export const usePersonalInformationFormik = (
    setLoading: (loading: boolean) => void,
    setEditing: (editing: boolean) => void
) => {

    const { t } = useTranslation();
    const toaster = useToaster();
    const internationalization = useInternationalizationStore();
    const user = useUserStore().user;

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
            .nullable(),

        birthDay: Yup.string()
            .nullable()
            .test('birthDay-length', t('birth-day-invalid'), (value) => {
                return value === null || value === undefined || value === '' || value.length === 10;
            }),

    })

    const handleFormSubmit = async (
        values: PersonalInformationFormData,
        setLoading: (loading: boolean) => void,
        toaster: (message: string, autoHideDuration?: number, severity?: Severity, variant?: Variant) => void,
        setEditing: (editing: boolean) => void,
        setValues: (values: PersonalInformationFormData) => void
    ) => {
        setLoading(true);
        try {
            const response = await ProfileService.editPersonalInformation(
                internationalization.language,
                user,
                values
            )
            const updatedValues = response.data;
            updatedValues.birthDay = formatDateToScreen(updatedValues.birthDay);
            updatedValues.taxNumber = updatedValues.taxRegistration;
            user.avatar = `data:image/png;base64,${updatedValues.avatar}`;
            user.firstName = updatedValues.firstName;
            user.lastName = updatedValues.lastName;
            setValues(updatedValues);
            setEditing(false);
            toaster(t('edit-personal-information-success'), 5000, 'success', 'filled');
        } catch (error) {
            toaster(handleError(error), 5000, 'error', 'filled');
        }
        setLoading(false);
    }

    const formik = useFormik<PersonalInformationFormData>({
        initialValues: {
            avatar: null,
            firstName: '',
            lastName: '',
            gender: '',
            birthDay: null,
            taxNumber: null,
            userId: 0
        },

        validationSchema: PersonalInformationFormDataValidation,

        onSubmit: (values: PersonalInformationFormData) => {
            handleFormSubmit(values, setLoading, toaster, setEditing, formik.setValues);
        }
    });

    return formik;
}