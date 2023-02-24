import {
  BrowserRouter, Link, Routes, Route, Navigate,
} from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import useAuth from '../hooks/index.jsx';
import { AuthContext } from '../contexts/index.jsx';
import Authorization from './Authorization';
import Chat from './Chat';
import NotFound from './NotFound';
import getModal from './modals/index.js';
import SignUp from './SignUp.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('user'));
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
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

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo) {
    return null;
  }

  const Component = getModal(modalInfo);
  return <Component modalInfo={modalInfo} onHide={hideModal} />;
};

const App = () => {
  const [modalInfo, setModalInfo] = useState(null);
  const hideModal = () => setModalInfo(null);
  const showModal = (type) => setModalInfo(type);

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
            <Route path="signup" element={<SignUp />} />
            <Route
              path="/"
              element={(
                <IsLogin>
                  <Chat showModal={showModal} />
                </IsLogin>
              )}
            />
          </Routes>
        </div>
        {renderModal({ modalInfo, hideModal })}
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
