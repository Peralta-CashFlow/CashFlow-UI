import styles from '../Menu.module.css';
import { Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DatasetLinkedSharpIcon from '@mui/icons-material/DatasetLinkedSharp';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface RegisterOptionProps {
    handleClick: (path: string) => void;
}

const RegisterOption: React.FC<RegisterOptionProps> = ({
    handleClick
}) => {

    const { t } = useTranslation();
    const [subOptions, setSubOptions] = useState(false);

    return (
        <List disablePadding>
            <Divider className={styles.divider} />
            <ListItemButton
                onMouseEnter={() => setSubOptions(true)}
                onMouseLeave={() => setSubOptions(false)}
            >
                <ListItemIcon className={styles.listIcon}>
                    <div className={styles.baseOption}>
                        <DatasetLinkedSharpIcon className={styles.icon} fontSize='large' />
                        <ListItemText primary={t('registrations')}
                            className={styles.itemHeader}
                            slotProps={{
                                primary: {
                                    style: { fontSize: '55%' }
                                }
                            }} />
                    </div>
                    {subOptions &&
                        <ListItemButton className={styles.subOption}
                            onClick={() => handleClick('/category')}
                        >
                            <ListItemText primary={t('category')}
                                className={styles.subItemHeader}
                                slotProps={{
                                    primary: {
                                        style: { fontSize: '55%' }
                                    }
                                }} />
                        </ListItemButton>
                    }
                </ListItemIcon>
            </ListItemButton>
            <Divider className={styles.divider} />
        </List>
    )
}

export default RegisterOption;