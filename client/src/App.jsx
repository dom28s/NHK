// src/App.jsx
import React from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
import Header from './components/header.jsx';
import { Home } from './pages/home.jsx';
import Favorite from './pages/favorite.jsx';
import Chat from './pages/chat.jsx';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToPage = () => {
    console.log(location.pathname)
    if (location.pathname === '/signup') {
      navigate('/');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Header />

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/favorite' element={<Favorite/>}/>
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
      {(location.pathname == '/' || location.pathname == '/signup') && (
        <button onClick={goToPage}>
          {location.pathname === '/' ? 'Go to Signup' : 'Go to Login'}
        </button>
      )}
    </div>
  );
}
