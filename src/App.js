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

import { UserProvider } from './context/UserContext';
// import { useAuth } from './hooks/useAuth';

function App() {

  // const { authenticated } = useAuth();

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
              
              <Route
                path="/admin/registrar"
                element={
                  <AdminRoute>
                    <RegisterAdmin />
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
