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

const PersonalTab: React.FC = () => {

    const [loading, setLoading] = useState(false);

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
                <form onSubmit={editFormik.handleSubmit}>

                </form>
            </div>
        </Box>
    );
}

export default PersonalTab;