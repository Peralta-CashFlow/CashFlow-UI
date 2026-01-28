import stylesBase from "../Profile.module.css";
import styles from "./SecurityTab.module.css";

import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../../../stores/user/UserStore";
import BaseButton from "../../../components/button/BaseButton";
import KeyIcon from '@mui/icons-material/Key';
import colors from "../../../assets/colors/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import BaseTextField from "../../../components/textfield/BaseTextField";
import { useChangePasswordFormik } from "../../../service/profile/form/ChangePasswordForm";
import { useDeleteAccountFormik } from "../../../service/profile/form/DeleteAccountForm";

const SecurityTab: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [passwordEditing, setPasswordEditing] = useState(false);
    const [accountDeleting, setAccountDeleting] = useState(false);

    const passwordFormik = useChangePasswordFormik(setLoading, setPasswordEditing);
    const deleteAccountFormik = useDeleteAccountFormik(setLoading);

    const { t } = useTranslation();

    const saveActionComponent = (cancelAction: () => void): React.ReactNode => {
        return (
            <div className={styles.saveContainer}>
                <BaseButton
                    text={t('cancel')}
                    backGroundColor='red'
                    type='button'
                    className={styles.button}
                    onClick={cancelAction}
                />
                <BaseButton
                    text={t('save')}
                    backGroundColor={colors.blue}
                    className={styles.button}
                    type='submit'
                />
            </div>
        )
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
                    <p>{t('security-information-text')}</p>
                </div>
                {!passwordEditing && !accountDeleting &&
                    <div className={styles.buttonContainer}>
                        <BaseButton
                            text={t('change-password')}
                            backGroundColor={colors.blue}
                            icon={KeyIcon}
                            fontWeight='bold'
                            type='button'
                            fontSize='100%'
                            className={styles.baseButton}
                            onClick={() => setPasswordEditing(true)}
                        />
                        <BaseButton
                            text={t('delete-account')}
                            backGroundColor='red'
                            fontWeight='bold'
                            type='button'
                            fontSize='100%'
                            className={styles.baseButton}
                            icon={DeleteIcon}
                            onClick={() => setAccountDeleting(true)}
                        />
                    </div>
                }
                {passwordEditing &&
                    <div>
                        <form className={styles.passwordForm} onSubmit={passwordFormik.handleSubmit}>
                            <BaseTextField
                                label={t('current-password')}
                                required={true}
                                type='password'
                                fieldName='oldPassword'
                                value={passwordFormik.values.oldPassword}
                                onChange={passwordFormik.handleChange}
                                onBlur={passwordFormik.handleBlur}
                                error={passwordFormik.touched.oldPassword && Boolean(passwordFormik.errors.oldPassword)}
                                helperText={passwordFormik.touched.oldPassword && passwordFormik.errors.oldPassword}
                            />
                            <BaseTextField
                                label={t('new-password')}
                                required={true}
                                type='password'
                                fieldName='newPassword'
                                value={passwordFormik.values.newPassword}
                                onChange={passwordFormik.handleChange}
                                onBlur={passwordFormik.handleBlur}
                                error={passwordFormik.touched.newPassword && Boolean(passwordFormik.errors.newPassword)}
                                helperText={passwordFormik.touched.newPassword && passwordFormik.errors.newPassword}
                            />
                            {saveActionComponent(() => {
                                setPasswordEditing(false);
                                passwordFormik.resetForm();
                            })}
                        </form>
                    </div>
                }
                {accountDeleting &&
                    <form className={styles.passwordForm} onSubmit={deleteAccountFormik.handleSubmit}>
                        <p className={styles.warningText}>{t('delete-account-text')}</p>
                        <BaseTextField
                            label={t('password')}
                            required={true}
                            type='password'
                            fieldName='password'
                            value={deleteAccountFormik.values.password}
                            onChange={deleteAccountFormik.handleChange}
                            onBlur={deleteAccountFormik.handleBlur}
                            error={deleteAccountFormik.touched.password && Boolean(deleteAccountFormik.errors.password)}
                            helperText={deleteAccountFormik.touched.password && deleteAccountFormik.errors.password}
                        />
                        {saveActionComponent(() => {
                            setAccountDeleting(false);
                            deleteAccountFormik.resetForm();
                        })}
                    </form>
                }
            </div>
            }
        </Box>
    );
}

export default SecurityTab;