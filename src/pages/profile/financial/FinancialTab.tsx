import stylesBase from "../Profile.module.css";
import styles from "./FinancialTab.module.css";

import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInternationalizationStore } from "../../../stores/internationalization/InternationalizationStore";
import { useFinancialInformationFormik } from "../../../service/profile/form/FinancialInformationForm";
import { useUserStore } from "../../../stores/user/UserStore";
import { useToaster } from "../../../components/toaster/ToasterProvider";
import { handleError } from "../../../utils/error/ErrorHandler";
import ProfileService from "../../../service/profile/ProfileService";
import BaseButton from "../../../components/button/BaseButton";
import colors from "../../../assets/colors/colors";
import CreateIcon from '@mui/icons-material/Create';
import BaseTextField from "../../../components/textfield/BaseTextField";
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { toLocaleString } from "../../../utils/number/NumberHandler";

const FinancialTab: React.FC = () => {

    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    const { t } = useTranslation();
    const internationalization = useInternationalizationStore();
    const editFormik = useFinancialInformationFormik(setLoading, setEditing);
    const user = useUserStore().user;
    const toaster = useToaster();

    useEffect(() => {
        fetchFinancialInformation();
    }, []);

    const fetchFinancialInformation = async () => {
        editFormik.resetForm();
        setEditing(false);
        setLoading(true);
        try {
            const financialInformation = await ProfileService.getFinancialInformation(
                internationalization.language,
                user
            );
            if (financialInformation) {
                editFormik.setValues(financialInformation);
                editFormik.setFieldValue('income', toLocaleString(financialInformation.income, internationalization.language));
                editFormik.setFieldValue('expense', toLocaleString(financialInformation.expense, internationalization.language));
            }
        } catch (error) {
            toaster(handleError(error), 5000, 'error', 'filled');
        }
        setLoading(false);
    }

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => {
        let numericValue = e.target.value.replace(/\D/g, '');

        if (!numericValue) {
            editFormik.setFieldValue(fieldName, '');
            return;
        }

        const floatValue = Number.parseFloat(numericValue) / 100;

        const formattedValue = floatValue.toLocaleString(internationalization.language, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        editFormik.setFieldValue(fieldName, formattedValue);
    };

    return (
        <Box className={stylesBase.box}>
            {loading &&
                <div className={stylesBase.loadingContainer}>
                    <CircularProgress sx={{ color: 'white' }} size={'5%'} />
                </div>
            }
            {!loading && <div>
                <div className={stylesBase.headerContainer}>
                    <p>{t('financial-information-text')}</p>
                    {!editing &&
                        <div className={stylesBase.editButton}>
                            <BaseButton
                                text={t('edit')}
                                backGroundColor={colors.blue}
                                fontSize='60%'
                                fontWeight='bold'
                                type="button"
                                icon={CreateIcon}
                                onClick={() => setEditing(true)}
                            />
                        </div>
                    }
                </div>
                <form onSubmit={editFormik.handleSubmit} className={styles.fields}>
                    <BaseTextField
                        label={t('occupation')}
                        fieldName='occupation'
                        type='text'
                        value={editFormik.values.occupation}
                        onBlur={editFormik.handleBlur}
                        onChange={editFormik.handleChange}
                        error={editFormik.touched.occupation && Boolean(editFormik.errors.occupation)}
                        helperText={editFormik.touched.occupation && editFormik.errors.occupation}
                        disabled={!editing}
                        width="500px"
                    />
                    <div className={styles.moneyFields}>
                        <BaseTextField
                            label={t('monthly-income')}
                            fieldName='income'
                            type='text'
                            value={editFormik.values.income}
                            onBlur={editFormik.handleBlur}
                            onChange={(e) => handleValueChange(e, 'income')}
                            error={editFormik.touched.income && Boolean(editFormik.errors.income)}
                            helperText={editFormik.touched.income && editFormik.errors.income}
                            disabled={!editing}
                            width={internationalization.language == 'en' ? "175px" : "190px"}
                            initialAdornment={t('currency-symbol')}
                        />
                        <BaseTextField
                            label={t('monthly-expense')}
                            fieldName='expense'
                            type='text'
                            value={editFormik.values.expense}
                            onBlur={editFormik.handleBlur}
                            onChange={(e) => handleValueChange(e, 'expense')}
                            error={editFormik.touched.expense && Boolean(editFormik.errors.expense)}
                            helperText={editFormik.touched.expense && editFormik.errors.expense}
                            disabled={!editing}
                            initialAdornment={t('currency-symbol')}
                            width={internationalization.language == 'en' ? "175px" : "190px"}
                        />
                    </div>
                    <BaseTextField
                        label={t('savings-goal')}
                        fieldName='goals'
                        type='text'
                        value={editFormik.values.goals}
                        onBlur={editFormik.handleBlur}
                        onChange={editFormik.handleChange}
                        error={editFormik.touched.goals && Boolean(editFormik.errors.goals)}
                        helperText={editFormik.touched.goals && editFormik.errors.goals}
                        disabled={!editing}
                        width="500px"
                    />
                    {editing &&
                        <div className={stylesBase.buttonRow}>
                            <BaseButton
                                text={t('save')}
                                backGroundColor={'green'}
                                fontSize='100%'
                                fontWeight='bold'
                                type="submit"
                                icon={SaveIcon}
                                onClick={() => setEditing(true)}
                            />
                            <BaseButton
                                text={t('cancel')}
                                backGroundColor={'red'}
                                fontSize='100%'
                                fontWeight='bold'
                                type="button"
                                icon={CancelIcon}
                                onClick={() => fetchFinancialInformation()}
                            />
                        </div>
                    }
                </form>
            </div>
            }
        </Box>
    );
}

export default FinancialTab;