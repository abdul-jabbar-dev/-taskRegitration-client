import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivetRoute from './PrivetRoute';
import './App.css';
import LoginFom from './LoginFom';
import RegisterFom from './RegisterFom';
import WelcomePage from './WelcomePage';

function App() {
  const [userLogin, setUserLogin] = useState({ eail: 'dfdf' })
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivetRoute userLogin={userLogin}><WelcomePage /></PrivetRoute>} />
          <Route path="home" element={<PrivetRoute userLogin={userLogin}><WelcomePage /></PrivetRoute>} />
          <Route path="create" element={<RegisterFom />} />
          <Route path="login" element={<LoginFom />} />
        </Routes>
      </BrowserRouter>,
      {/* <Users></Users> */}
    </div >
  );
}

export default App;
