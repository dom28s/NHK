import React from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/login/login.jsx';
import Signup from './pages/signup/signup.jsx';
import Header from './components/header/header.jsx';
import { Home } from './pages/home/home.jsx';
import Favorite from './pages/favorite/favorite.jsx';
import Chat from './pages/chat/chat.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import './App.css'
import News from './pages/news/news.jsx';
import NewsDetail from './pages/newsDetail/newsDetail.jsx';

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
    <div className={location.pathname == '/' || location.pathname == '/signup' ? 'auth-page' : 'normal-page'}>


      {console.log(location.pathname)}
      {location.pathname != '/' && location.pathname != '/signup' && <Header />}


      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path='/newsDetail' element={<PrivateRoute>
          <NewsDetail />
        </PrivateRoute>} />
        <Route path='/news' element={<PrivateRoute>
          <News />
        </PrivateRoute>} />
        <Route path='/home' element={<PrivateRoute>
          <Home />
        </PrivateRoute>} />
        <Route path='/favorite' element={<PrivateRoute>
          <Favorite />
        </PrivateRoute>} />
        <Route path='/chat' element={<PrivateRoute>
          <Chat />
        </PrivateRoute>} />
      </Routes>


    </div>
  );
}
