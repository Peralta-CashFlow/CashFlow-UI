import styles from './Profile.module.css';

import * as React from 'react';
import { Box, Tabs, Tab } from "@mui/material"
import { useTranslation } from 'react-i18next';
import colors from '../../assets/colors/colors';
import CloseIcon from '@mui/icons-material/Close';

import PersonalTab from './personal/PersonalTab';
import SecurityTab from './security/SecurityTab';
import FinancialTab from './financial/FinancialTab';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {

    const [tab, setTab] = React.useState(0);

    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                bgcolor: colors.gray
            }}
            className={styles.profileContainer}
        >
            <Tabs
                orientation='vertical'
                value={tab}
                onChange={(event, newValue) => setTab(newValue)}
                className={styles.tabs}
                slotProps={{
                    indicator: {
                        sx: {
                            backgroundColor: colors.lightBlueGreen,
                            width: '2px'
                        }
                    }
                }}
                sx={{
                    '& .MuiTab-root': {
                        textTransform: 'none',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '100%',
                        '&.Mui-selected': {
                            color: colors.lightBlueGreen
                        }
                    }
                }}
            >
                <Tab label={t('personal-information')} />
                <Tab label={t('financial-information')} />
                <Tab label={t('security')} />
            </Tabs>
            {tab === 0 && <PersonalTab />}
            {tab === 1 && <FinancialTab />}
            {tab === 2 && <SecurityTab />}
            <CloseIcon
                className={styles.closeIcon}
                onClick={() => navigate('/home')}
            />
        </Box>
    );
}

export default Profile;