import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Severity, useToaster, Variant } from '../../../components/toaster/ToasterProvider';
import { useInternationalizationStore } from '../../../stores/internationalization/InternationalizationStore';
import { useUserStore } from '../../../stores/user/UserStore';
import { CategoryResponse } from '../../../dto/category/CategoryResponse';
import { useFormik } from 'formik';
import CategoryService from '../CategoryService';
import { handleError } from '../../../utils/error/ErrorHandler';

export const useCategoryEditionFormik = (
    setLoading: (loading: boolean) => void,
    fetchCategories: () => void
) => {

    const { t } = useTranslation();
    const toaster = useToaster();
    const internationalization = useInternationalizationStore();
    const user = useUserStore().user;

    const EditCategoryFormDataValidation = Yup.object({
        name: Yup.string()
            .required(t('category-name-required'))
            .max(20, t('category-name-too-long'))
    })

    const handleFormSubmit = async (
        value: CategoryResponse,
        formikHelpers: any,
        setLoading: (loading: boolean) => void,
        toaster: (message: string, autoHideDuration?: number, severity?: Severity, variant?: Variant) => void,
        fetchCategories: () => void
    ) => {
        setLoading(true);
        try {
            const response = await CategoryService.updateCategory(
                internationalization.language,
                user.jwt,
                value
            );
            formikHelpers.setValues(response);
            fetchCategories();
            toaster(t('edit-category-success'), 5000, 'success', 'filled');
        } catch (error) {
            toaster(handleError(error), 5000, 'error', 'filled');
        }
        setLoading(false);
    }

    return useFormik<CategoryResponse>({
        initialValues: {
            id: 0,
            name: '',
            color: '',
            icon: '',
            tags: []
        },

        validationSchema: EditCategoryFormDataValidation,

        onSubmit: (value: CategoryResponse, formikHelpers) => {
            handleFormSubmit(value, formikHelpers, setLoading, toaster, fetchCategories);
        }
    })

}