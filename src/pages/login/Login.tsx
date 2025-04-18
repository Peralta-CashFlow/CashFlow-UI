import styles from './Login.module.css';
import logo from '../../assets/images/logo.png';
import loginImage from '../../assets/images/loginImage.png'
import BaseTextField from '../../components/textfield/BaseTextField';
import BaseButton from '../../components/button/BaseButton';
import LockIcon from '@mui/icons-material/Lock';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import colors from '../../assets/colors/colors';
import { useState } from 'react';
import Modal from '@mui/material/Modal';

const Login: React.FC = () => {

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.leftPane}>
          <img src={logo} alt="CashFlow Logo" className={styles.logo} />
          <h1 className={styles.text}>Welcome</h1>
          <p className={styles.text}>Please login to your account.</p>
          <form>
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
              text='Login'
              icon={LockIcon}
              backGroundColor={colors.blue}
              loading={false}
              fontSize='1.2vw'
              fontWeight='bold'
              spinnerSize={25}
            />
            <p className={styles.text}>Don't have an account?</p>
            <BaseButton
              className={styles.button}
              text='Signup'
              backGroundColor={colors.blue}
              fontSize='1.2vw'
              fontWeight='bold'
              icon={PersonAddIcon}
              onClick={() => setOpenModal(true)}
            />
          </form>
        </div>
        <div className={styles.rightPane}>
          <img src={loginImage} alt="Someone making your finances" className={styles.loginImage} />
        </div>
      </div>
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
    </div>
  );
};

export default Login;