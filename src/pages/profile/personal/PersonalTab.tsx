import styles from "./PersonalTab.module.css";

import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { usePersonalInformationFormik } from "../../../service/profile/form/PersonalInformationForm";
import ProfileService from "../../../service/profile/ProfileService";
import { useToaster } from "../../../components/toaster/ToasterProvider";
import { useInternationalizationStore } from "../../../stores/internationalization/InternationalizationStore";
import { useUserStore } from "../../../stores/user/UserStore";
import { handleError } from "../../../utils/error/ErrorHandler";
import BaseTextField from "../../../components/textfield/BaseTextField";
import EditableAvatar from "../../../components/avatar/EditableAvatar";
import BaseRadioGroup from "../../../components/radio/BaseRadioGroup";
import { formatDateToScreen, formatStringInputToDate } from "../../../utils/date/DateHandler";

const PersonalTab: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    const { t } = useTranslation();
    const internationalization = useInternationalizationStore();
    const editFormik = usePersonalInformationFormik(setLoading);
    const user = useUserStore().user;
    const toaster = useToaster();

    useEffect(() => {
        const fetchPersonalInformation = async () => {
            setLoading(true);
            try {
                const personalInformation = await ProfileService.getPersonalInformation(
                    internationalization.language,
                    user.jwt,
                    user.id
                );
                await editFormik.setValues(personalInformation.data);
                editFormik.setFieldValue('birthDay', formatDateToScreen(personalInformation.data.birthDay));
            } catch (error) {
                toaster(handleError(error), 5000, 'error', 'filled');
            }
            setLoading(false);
        }
        fetchPersonalInformation();
    }, []);

    return (
        <Box className={styles.box}>
            <div className={styles.headerContainer}>
                <p>{t('personal-information-text')}</p>
            </div>
            <form onSubmit={editFormik.handleSubmit}>
                <EditableAvatar
                    image={editFormik.values.avatar}
                    width={120}
                    height={120}
                    fallback={user.firstName.charAt(0) + user.lastName.charAt(0)}
                    tooltip={t('profile-picture')}
                />
                <BaseTextField
                    label={t('first-name')}
                    required={true}
                    fieldName='firstName'
                    type='text'
                    value={editFormik.values.firstName}
                    onBlur={editFormik.handleBlur}
                    onChange={editFormik.handleChange}
                    error={editFormik.touched.firstName && Boolean(editFormik.errors.firstName)}
                    helperText={editFormik.touched.firstName && editFormik.errors.firstName}
                    disabled={!editing}
                />
                <BaseTextField
                    label={t('last-name')}
                    required={true}
                    fieldName='lastName'
                    type='text'
                    value={editFormik.values.lastName}
                    onBlur={editFormik.handleBlur}
                    onChange={editFormik.handleChange}
                    error={editFormik.touched.lastName && Boolean(editFormik.errors.lastName)}
                    helperText={editFormik.touched.lastName && editFormik.errors.lastName}
                    disabled={!editing}
                />
                <BaseTextField
                    label={t('tax-number')}
                    required={false}
                    fieldName='taxRegistration'
                    type='text'
                    value={editFormik.values.taxRegistration}
                    onBlur={editFormik.handleBlur}
                    onChange={editFormik.handleChange}
                    error={editFormik.touched.taxRegistration && Boolean(editFormik.errors.taxRegistration)}
                    helperText={editFormik.touched.taxRegistration && editFormik.errors.taxRegistration}
                    disabled={!editing}
                />
                <BaseTextField
                    label={t('birth-day')}
                    required={false}
                    fieldName={'birthDay'}
                    value={editFormik.values.birthDay}
                    type='text'
                    onBlur={editFormik.handleBlur}
                    error={editFormik.touched.birthDay && Boolean(editFormik.errors.birthDay)}
                    helperText={editFormik.touched.birthDay && editFormik.errors.birthDay}
                    onChange={(e) => editFormik.setFieldValue('birthDay', formatStringInputToDate(e.target.value))}
                    disabled={!editing}
                />
                <BaseRadioGroup
                    label={t('gender')}
                    value={editFormik.values.gender}
                    onChange={(e) => editFormik.setFieldValue('gender', e.target.value)}
                    disabled={!editing}
                    options={{ 'Female': t('female'), 'Male': t('male') }}
                    direction='row'
                    labelFontSize="80%"
                />
            </form>
        </Box>
    );
}

export default PersonalTab;