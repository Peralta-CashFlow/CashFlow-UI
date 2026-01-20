import stylesBase from '../Profile.module.css';
import styles from "./PersonalTab.module.css";

import { Box, CircularProgress } from "@mui/material";
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
import BaseButton from "../../../components/button/BaseButton";
import colors from "../../../assets/colors/colors";
import CreateIcon from '@mui/icons-material/Create';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';

const PersonalTab: React.FC = () => {

    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    const { t } = useTranslation();
    const internationalization = useInternationalizationStore();
    const editFormik = usePersonalInformationFormik(setLoading, setEditing);
    const user = useUserStore().user;
    const toaster = useToaster();

    useEffect(() => {
        fetchPersonalInformation();
    }, []);

    const fetchPersonalInformation = async () => {
        setEditing(false);
        setLoading(true);
        try {
            const personalInformation = await ProfileService.getPersonalInformation(
                internationalization.language,
                user.jwt,
                user.id
            );
            editFormik.setValues(personalInformation.data);
            editFormik.setFieldValue('birthDay', formatDateToScreen(personalInformation.data.birthDay));
            editFormik.setFieldValue('taxNumber', personalInformation.data.taxRegistration)
        } catch (error) {
            toaster(handleError(error), 5000, 'error', 'filled');
        }
        setLoading(false);
    }

    return (
        <Box className={stylesBase.box}>
            {loading &&
                <div className={stylesBase.loadingContainer}>
                    <CircularProgress sx={{ color: 'white' }} size={'5%'} />
                </div>
            }
            {!loading && <div>
                <div className={stylesBase.headerContainer}>
                    <p>{t('personal-information-text')}</p>
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
                <form onSubmit={editFormik.handleSubmit}>
                    <div className={styles.avatar}>
                        <EditableAvatar
                            image={editFormik.values.avatar}
                            width={120}
                            height={120}
                            fallback={user.firstName.charAt(0) + user.lastName.charAt(0)}
                            tooltip={t('profile-picture')}
                            editing={editing}
                            onChange={(base64) => editFormik.setFieldValue('avatar', base64)}
                        />
                    </div>
                    <div className={styles.fields}>
                        <div className={styles.fieldRow}>
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
                        </div>
                    </div>
                    <div className={styles.fields}>
                        <div className={styles.fieldRow}>
                            <BaseTextField
                                label={t('tax-number')}
                                required={false}
                                fieldName='taxNumber'
                                type='text'
                                value={editFormik.values.taxNumber}
                                onBlur={editFormik.handleBlur}
                                onChange={editFormik.handleChange}
                                error={editFormik.touched.taxNumber && Boolean(editFormik.errors.taxNumber)}
                                helperText={editFormik.touched.taxNumber && editFormik.errors.taxNumber}
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
                        </div>
                    </div>
                    <div className={styles.fields}>
                        <BaseRadioGroup
                            label={t('gender')}
                            value={editFormik.values.gender}
                            onChange={(e) => editFormik.setFieldValue('gender', e.target.value)}
                            disabled={!editing}
                            options={{ 'Female': t('female'), 'Male': t('male') }}
                            direction='row'
                            labelFontSize="80%"
                        />
                    </div>
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
                                onClick={() => fetchPersonalInformation()}
                            />
                        </div>
                    }
                </form>
            </div>
            }
        </Box>
    );
}

export default PersonalTab;