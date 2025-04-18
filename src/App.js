import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import ToasterProvider from './components/toaster/ToasterProvider';
import Login from './pages/login/Login';

function App() {
  return (
    <ToasterProvider>
      <div>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path='/' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ToasterProvider>
  );
}

export default App;
