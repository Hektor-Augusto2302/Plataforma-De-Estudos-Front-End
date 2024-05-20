import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import RegisterAdmin from './pages/Auth/RegisterAdmin/RegisterAdmin';
import Questions from './pages/Questions/Questions';
import Profile from './pages/User/Profile';
import RegisterQuestion from './pages/RegisterQuestion/RegisterQuestion';
import EditQuestions from './pages/EditQuestions/EditQuestions';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Message from './components/Message/Message';
import AdminRoute from './components/AdminRoute/AdminRoute';

import { UserProvider } from './context/UserContext';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <Navbar />
          <Message />
          <div className="app-container">
            <Routes>
              <Route path='/' element={isLoggedIn ? <Login onLogin={handleLogin} /> : <Home /> } />
              <Route path='/entrar' element={<Login onLogin={handleLogin} />} />
              <Route path='/registrar' element={<Register />} />
              <Route path='/perfil' element={<Profile /> } />
              <Route path='/questoes' element={<Questions />} />

              <Route
                path="/admin/registrar"
                element={
                  <AdminRoute role="admin">
                    <RegisterAdmin />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/questoes"
                element={
                  <AdminRoute role="admin">
                    <RegisterQuestion />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/questoes/:id"
                element={
                  <AdminRoute role="admin">
                    <EditQuestions />
                  </AdminRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
