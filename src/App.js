import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import ToasterProvider from './components/toaster/ToasterProvider';
import Login from './pages/login/Login';
import Home from './pages/home/Home';

function App() {
  return (
    <ToasterProvider>
      <div>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ToasterProvider>
  );
}

export default App;
