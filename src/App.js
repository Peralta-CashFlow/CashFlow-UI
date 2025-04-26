import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import ToasterProvider from './components/toaster/ToasterProvider';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import { useUserValidator } from './validators/user/UserValidator';

function App() {

  const { userIsLoggedIn } = useUserValidator();

  return (
    <ToasterProvider>
      <div>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={userIsLoggedIn() ? <Home /> : <Navigate to ='/' />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ToasterProvider>
  );
}

export default App;
