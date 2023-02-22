import { Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import image from '../assets/avatar.jpg';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const Authorization = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  console.log('author');
  const location = useLocation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('user', JSON.stringify(res.data));
        const { from } = location.state || { from: { pathname: '/' } };
        auth.logIn();
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
      <div className="card shadow-sm">
        <div className="card-body row p-5">
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <img src={image} className="rounded-circle" alt="Войти" />
          </div>
          <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
            <h1 className="text-center mb-4">Войти</h1>
            <fieldset disabled={formik.isSubmitting}>
              <Form.Group className="form-floating mb-3" controlId="formName">
                <Form.Control name="username" isInvalid={authFailed} value={formik.values.username} onChange={formik.handleChange} required placeholder="Ваш ник" />
                <Form.Label>Ваш ник</Form.Label>
              </Form.Group>
              <Form.Group className="form-floating mb-4" controlId="formPassword">
                <Form.Control name="password" isInvalid={authFailed} value={formik.values.password} onChange={formik.handleChange} type="password" required placeholder="Пароль" />
                <Form.Label>Пароль</Form.Label>
                <Form.Control.Feedback tooltip type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
              </Form.Group>
              <Button variant="outline-primary w-100 mb-3" type="submit">
                Войти
              </Button>
            </fieldset>
          </Form>
        </div>
        <div className="card-footer p-4">
          <div className="text-center">
            <span>Нет аккаунта? </span>
            <a href="/signup">Регистрация</a>
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Authorization;
