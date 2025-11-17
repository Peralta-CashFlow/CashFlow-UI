import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

import ToasterProvider from './components/toaster/ToasterProvider';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import { useUserValidator } from './validators/user/UserValidator';
import { useUserStore } from "./stores/user/UserStore";
import BaseAvatar from './components/avatar/BaseAvatar';
import { useTranslation } from 'react-i18next';

function App() {

  const user = useUserStore.getState().user;
  const { userIsLoggedIn } = useUserValidator();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const avatarOptions: Record<string, () => void> = {
    [t('settings')]: () => {
      navigate('/profile/settings')
    },
    [t('logout')]: () => {
      useUserStore.setState(useUserStore.getInitialState);
      navigate('/');
    }
  };

  return (
    <ToasterProvider>
      <div>
        <div style={{
          position: 'absolute',
          top: '15px',
          right: '20px',
          zIndex: 1000
        }}>
          {userIsLoggedIn() ? <BaseAvatar
            image={user.avatar}
            width={55}
            height={55}
            fallback={user.firstName.charAt(0) + user.lastName.charAt(0)}
            cursor='pointer'
            tooltip={t('profile')}
            options={avatarOptions}
          /> : null}
        </div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={userIsLoggedIn() ? <Home /> : <Navigate to='/' />} />
        </Routes>
      </div>
    </ToasterProvider>
  );
}

export default App;
