import * as Yup from 'yup';
import { useTranslation } from "react-i18next"
import { Severity, useToaster, Variant } from "../../../components/toaster/ToasterProvider";
import { useInternationalizationStore } from "../../../stores/internationalization/InternationalizationStore";
import { CategoryCreationRequest } from '../../../dto/category/CategoryCreationRequest';
import { handleError } from '../../../utils/error/ErrorHandler';
import { useFormik } from 'formik';
import CategoryService from '../CategoryService';
import { useUserStore } from '../../../stores/user/UserStore';

export const useCategoryCreationFormik = (
    setLoading: (loading: boolean) => void,
    handleClose: () => void,
    page: number,
    setPage: (page: number) => void,
    fetchCategories: () => void
) => {

    const { t } = useTranslation();
    const toaster = useToaster();
    const internationalization = useInternationalizationStore();
    const user = useUserStore().user;

    const CreateCategoryFormDataValidation = Yup.object({
        name: Yup.string()
            .required(t('category-name-required'))
            .max(20, t('category-name-too-long'))            
    })

    const handleFormSubmit = async (
        values: CategoryCreationRequest,
        formikHelpers: any,
        setLoading: (loading: boolean) => void,
        toaster: (message: string, autoHideDuration?: number, severity?: Severity, variant?: Variant) => void
    ) => {
        setLoading(true);
        try {
            await CategoryService.registerCategory(
                internationalization.language,
                user.jwt,
                values
            );
            formikHelpers.resetForm();
            if (page !== 0) {
                setPage(0);
            } else {
                fetchCategories();
            }
            handleClose();
            toaster(t('create-category-success'), 5000, 'success', 'filled');
        } catch (error) {
            toaster(handleError(error), 5000, 'error', 'filled');
        }
        setLoading(false);
    }

    return useFormik<CategoryCreationRequest>({
        initialValues: {
            name: '',
            color: undefined,
            icon: undefined
        },

        validationSchema: CreateCategoryFormDataValidation,

        onSubmit: (values: CategoryCreationRequest, formikHelpers) => {
            handleFormSubmit(values, formikHelpers, setLoading, toaster);
        }
    })

}