import styles from './Menu.module.css';
import { Box, Drawer } from '@mui/material';
import RegisterOption from './category/RegisterOption';
import logo from '../../assets/images/logo.png';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useNavigate } from 'react-router-dom';

interface OpenMenuProps {
    setOpen: (open: boolean) => void
    open: boolean
}

const OpenMenu: React.FC<OpenMenuProps> = ({
    setOpen,
    open
}) => {

    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        navigate(path);
        setOpen(false)
    }

    const DrawerOptions = (
        <Box className={styles.box}>
            <div className={styles.logoContainer}>
                <button
                    className={styles.logoButton}
                    onClick={() => handleNavigate('/home')}
                >
                    <img
                        src={logo}
                        className={styles.logo}
                        alt='Logo'
                    />
                </button>
                <ArrowLeftIcon
                    className={styles.closeIcon}
                    sx={{ fontSize: 35 }}
                    onClick={() => setOpen(false)}
                />
            </div>
            <RegisterOption handleClick={handleNavigate} />
        </Box>
    );

    return (
        <Drawer
            open={open}
            hideBackdrop
            slotProps={{
                paper: {
                    sx: {
                        width: 240,
                        boxShadow: 'none',
                    },
                },
            }}
        >
            {DrawerOptions}
        </Drawer>
    )
}

export default OpenMenu