import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import RegisterAdmin from './pages/Auth/RegisterAdmin/RegisterAdmin';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Message from './components/Message/Message';
import AdminRoute from './components/AdminRoute/AdminRoute';
import Profile from './pages/User/Profile';
import RegisterQuestion from './pages/RegisterQuestion/RegisterQuestion';

import { UserProvider } from './context/UserContext';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <Navbar />
          <Message />
          <div className="app-container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/entrar' element={<Login />} />
              <Route path='/registrar' element={<Register />} />
              <Route path='/perfil' element={<Profile /> } />

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
            </Routes>
          </div>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
