import styles from './Login.module.css';
import Modal from '@mui/material/Modal';
import logo from '../../assets/images/logo.png';
import BaseTextField from '../../components/textfield/BaseTextField';
import BaseButton from '../../components/button/BaseButton';
import colors from '../../assets/colors/colors';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useRegisterFormik } from '../../dto/register/RegisterFormData';
import { useState } from 'react';

interface RegisterProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ openModal, setOpenModal }) => {

    const [loading, setLoading] = useState(false);

    const registerFormik = useRegisterFormik(setLoading, setOpenModal);

    const handleCloseModal = () => {
        setOpenModal(false);
        registerFormik.resetForm();
    }

    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div className={styles.modal}>
                <img src={logo} alt="CashFlow Logo" className={styles.logo} />
                <p className={styles.text}>Let's get you set up! Please fill in your details to register.</p>
                <form onSubmit={registerFormik.handleSubmit}>
                    <BaseTextField
                        label='First Name'
                        required={true}
                        type='text'
                        className={styles.textField}
                        fieldName='firstName'
                        value={registerFormik.values.firstName}
                        onChange={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                        error={registerFormik.touched.firstName && Boolean(registerFormik.errors.firstName)}
                        helperText={registerFormik.touched.firstName && registerFormik.errors.firstName}
                    />
                    <BaseTextField
                        label='Last Name'
                        required={true}
                        type='text'
                        className={styles.textField}
                        fieldName='lastName'
                        value={registerFormik.values.lastName}
                        onChange={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                        error={registerFormik.touched.lastName && Boolean(registerFormik.errors.lastName)}
                        helperText={registerFormik.touched.lastName && registerFormik.errors.lastName}
                    />
                    <BaseTextField
                        label='Email'
                        required={true}
                        type='email'
                        className={styles.textField}
                        fieldName='email'
                        value={registerFormik.values.email}
                        onChange={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                        error={registerFormik.touched.email && Boolean(registerFormik.errors.email)}
                        helperText={registerFormik.touched.email && registerFormik.errors.email}
                    />
                    <BaseTextField
                        label='Password'
                        required={true}
                        type='password'
                        className={styles.textField}
                        fieldName='password'
                        value={registerFormik.values.password}
                        onChange={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                        error={registerFormik.touched.password && Boolean(registerFormik.errors.password)}
                        helperText={registerFormik.touched.password && registerFormik.errors.password}
                    />
                    <BaseButton
                        className={styles.button}
                        text='Register'
                        backGroundColor={colors.blue}
                        fontSize='1.2vw'
                        fontWeight='bold'
                        icon={PersonAddIcon}
                        type='submit'
                        loading={loading}
                        spinnerSize={25}
                    />
                </form>
            </div>
        </Modal>
    );
}

export default Register;