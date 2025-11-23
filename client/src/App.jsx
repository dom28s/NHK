import React from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
import Header from './components/header.jsx';
import { Home } from './pages/home.jsx';
import Favorite from './pages/favorite.jsx';
import Chat from './pages/chat.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import './App.css'
import News from './pages/news.jsx';
import NewsDetail from './pages/newsDetail.jsx';
import Hiragana from './pages/hiragana.jsx';
import Katakana from './pages/katakana.jsx';


export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToPage = () => {
    if (location.pathname === '/signup') {
      navigate('/');
    } else {
      navigate('/signup');
    }
  };



  return (
    <div className={`${location.pathname == '/' || location.pathname == '/signup' ? 'auth-page' : 'normal-page'} min-h-screen transition-colors duration-200  dark:bg-gray-800 dark:text-white`}>


      {location.pathname != '/' && location.pathname != '/signup' && <Header />}


      <Routes>
        {/* <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} /> */}
        <Route path='/' element={<Home />} />
        <Route path='/favorite' element={ <Favorite/>}/>
        <Route path='/chat' element={<Chat />} />
        <Route path='/hira' element={<Hiragana />} />
        <Route path='/kata' element={ <Katakana />} />

        {/* <Route path='/newsDetail' element={<PrivateRoute>
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
        <Route path='/hira' element={<PrivateRoute>
          <Hiragana />
        </PrivateRoute>} />
        <Route path='/kata' element={<PrivateRoute>
          <Katakana />
        </PrivateRoute>} /> */}
      </Routes>


    </div>
  );
}
