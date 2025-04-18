import styles from './Login.module.css';
import Modal from '@mui/material/Modal';
import logo from '../../assets/images/logo.png';
import BaseTextField from '../../components/textfield/BaseTextField';
import BaseButton from '../../components/button/BaseButton';
import colors from '../../assets/colors/colors';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface RegisterProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ openModal, setOpenModal }) => {
    return (
        <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div className={styles.modal}>
                <img src={logo} alt="CashFlow Logo" className={styles.logo} />
                <p className={styles.text}>Let's get you set up! Please fill in your details to register.</p>
                <form>
                    <BaseTextField
                        label='First Name'
                        required={true}
                        type='text'
                        className={styles.textField}
                    />
                    <BaseTextField
                        label='Last Name'
                        required={true}
                        type='text'
                        className={styles.textField}
                    />
                    <BaseTextField
                        label='Email'
                        required={true}
                        type='email'
                        className={styles.textField}
                    />
                    <BaseTextField
                        label='Password'
                        required={true}
                        type='password'
                        className={styles.textField}
                    />
                    <BaseButton
                        className={styles.button}
                        text='Register'
                        backGroundColor={colors.blue}
                        fontSize='1.2vw'
                        fontWeight='bold'
                        icon={PersonAddIcon}
                        onClick={() => setOpenModal(true)}
                    />
                </form>
            </div>
        </Modal>
    );
}

export default Register;