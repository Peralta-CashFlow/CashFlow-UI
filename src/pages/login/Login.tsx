import styles from './Login.module.css';
import logo from '../../assets/images/logo.png';
import loginImage from '../../assets/images/loginImage.png'
import BaseTextField from '../../components/textfield/BaseTextField';
import BaseButton from '../../components/button/BaseButton';
import LockIcon from '@mui/icons-material/Lock';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import colors from '../../assets/colors/colors';
import { useState } from 'react';
import Register from './Register';
import { useLoginFormik } from '../../service/user/form/UserLoginForm';
import english from '../../assets/images/english.png';
import portuguese from '../../assets/images/portuguese.png';
import { Stack, Avatar, Tooltip } from '@mui/material';

const Login: React.FC = () => {

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const loginFormik = useLoginFormik(setLoading);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.leftPane}>
          <img src={logo} alt="CashFlow Logo" className={styles.logo} />
          <h1 className={styles.text}>Welcome</h1>
          <p className={styles.text}>Please login to your account.</p>
          <form onSubmit={loginFormik.handleSubmit}>
            <BaseTextField
              label='Email'
              required={true}
              type='email'
              className={styles.textField}
              fieldName='email'
              value={loginFormik.values.email}
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              error={loginFormik.touched.email && Boolean(loginFormik.errors.email)}
              helperText={loginFormik.touched.email && loginFormik.errors.email}
            />
            <BaseTextField
              label='Password'
              required={true}
              type='password'
              className={styles.textField}
              fieldName='password'
              value={loginFormik.values.password}
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              error={loginFormik.touched.password && Boolean(loginFormik.errors.password)}
              helperText={loginFormik.touched.password && loginFormik.errors.password}
            />
            <BaseButton
              className={styles.button}
              text='Login'
              icon={LockIcon}
              backGroundColor={colors.blue}
              loading={loading}
              fontSize='1.2vw'
              fontWeight='bold'
              spinnerSize={25}
              type='submit'
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
          <Stack direction="row" spacing={2} >
            <Tooltip title="English" placement="top" arrow>
              <Avatar alt="English"
                src={english}
                className={selectedLanguage === 'en' ? styles.selectedLanguage : styles.language}
                onClick={() => handleLanguageChange('en')}
              />
            </Tooltip>
            <Tooltip title="Portuguese" placement="top" arrow>
              <Avatar alt="Portuguese"
                src={portuguese}
                className={selectedLanguage === 'pt' ? styles.selectedLanguage : styles.language}
                onClick={() => handleLanguageChange('pt')}
              />
            </Tooltip>
          </Stack>
        </div>
        <div className={styles.rightPane}>
          <img src={loginImage} alt="Someone making your finances" className={styles.loginImage} />
        </div>
      </div>
      <Register
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default Login;