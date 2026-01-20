import * as Yup from 'yup';
import { useTranslation } from "react-i18next";
import { Severity, useToaster, Variant } from "../../../components/toaster/ToasterProvider";
import { useInternationalizationStore } from "../../../stores/internationalization/InternationalizationStore";
import { FinancialInformationFormData } from '../../../dto/profile/FinancialInformationFormData';
import { handleError } from '../../../utils/error/ErrorHandler';
import { useFormik } from 'formik';
import { parseLocaleNumber, toLocaleString } from '../../../utils/number/NumberHandler';
import ProfileService from '../ProfileService';
import { useUserStore } from '../../../stores/user/UserStore';

export const useFinancialInformationFormik = (
    setLoading: (loading: boolean) => void,
    setEditing: (editing: boolean) => void
) => {

    const { t } = useTranslation();
    const toaster = useToaster();
    const internationalization = useInternationalizationStore();
    const user = useUserStore().user;

    const FinancialInformationFormDataValidation = Yup.object({
        occupation: Yup.string()
            .nullable()
            .max(50, t('occupation-max-char')),

        income: Yup.string()
            .nullable()
            .test('is-positive', t('income-positive'), (value) => {
                if (!value) return true;
                const numericValue = parseLocaleNumber(value, internationalization.language);
                return numericValue > 0;
            }),

        expense: Yup.string()
            .nullable()
            .test('is-positive', t('expense-positive'), (value) => {
                if (!value) return true;
                const numericValue = parseLocaleNumber(value, internationalization.language);
                return numericValue > 0;
            }),

        goals: Yup.string()
            .nullable()
            .max(100, t('goals-max-char'))

    })

    const handleFormSubmit = async (
        values: FinancialInformationFormData,
        setLoading: (loading: boolean) => void,
        toaster: (message: string, autoHideDuration?: number, severity?: Severity, variant?: Variant) => void,
        setEditing: (editing: boolean) => void,
        setValues: (values: FinancialInformationFormData) => void
    ) => {
        const response = await ProfileService.editFinancialInformation(
            internationalization.language,
            user,
            values
        )
        response.expense = toLocaleString(response.expense, internationalization.language);
        response.income = toLocaleString(response.income, internationalization.language);
        setValues(response);
        setLoading(true);
        setEditing(false);
        toaster(t('edit-financial-information-success'), 5000, 'success', 'filled');
        try {
        } catch (error) {
            toaster(handleError(error), 5000, 'error', 'filled');
        }
        setLoading(false);
    }

    const formik = useFormik<FinancialInformationFormData>({
        initialValues: {
            userId: 0,
            occupation: null,
            income: null,
            expense: null,
            goals: null
        },

        validationSchema: FinancialInformationFormDataValidation,

        onSubmit: (values: FinancialInformationFormData) => {
            handleFormSubmit(values, setLoading, toaster, setEditing, formik.setValues);
        }
    });

    return formik;

}