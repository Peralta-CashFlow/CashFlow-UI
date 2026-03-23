import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Severity, useToaster, Variant } from '../../../components/toaster/ToasterProvider';
import { useInternationalizationStore } from '../../../stores/internationalization/InternationalizationStore';
import { useUserStore } from '../../../stores/user/UserStore';
import { CategoryResponse } from '../../../dto/category/CategoryResponse';
import { useFormik } from 'formik';

export const useCategoryEditionFormik = (
    setLoading: (loading: boolean) => void
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
        values: CategoryResponse,
        formikHelpers: any,
        setLoading: (loading: boolean) => void,
        toaster: (message: string, autoHideDuration?: number, severity?: Severity, variant?: Variant) => void
    ) => {
        setLoading(true);
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

        onSubmit: (values: CategoryResponse, formikHelpers) => {
            handleFormSubmit(values, formikHelpers, setLoading, toaster);
        }
    })

}