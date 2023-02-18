import { BrowserRouter, Link, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import useAuth from '../hooks/index.jsx';
import { AuthContext } from '../contexts/index.jsx';
import Authorization from './Authorization';
import Chat from './Chat';
import NotFound from './NotFound';
import { useContext } from 'react';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('user'));
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthButton = () => {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Выйти</Button>
      : ''
  );
};

const IsLogin = ({ children }) => {
  const auth = useAuth();
  return (
    auth.loggedIn ? children : <Navigate to="login" />
  );
};

const App = () => {
  console.log('app');
  return (
  <AuthProvider>
    <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <Navbar className="shadow-sm" bg="white" expand="lg">
        <div className="container">
        <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
        <AuthButton />
        </div>
      </Navbar>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="login" element={<Authorization />} />
        <Route
          path="/"
          element={(
            <IsLogin>
              <Chat />
            </IsLogin>
          )}
        />
      </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
  );
};

export default App;
