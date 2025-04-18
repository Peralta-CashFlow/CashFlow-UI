import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './pages/login/Login';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
