import { Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import image from '../assets/avatar_1.jpg';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const schema = Yup.object({
  username: Yup.string()
    .required('Обязательное поле')
    .min(3, 'от 3 до 20 символов')
    .max(20, 'от 3 до 20 символов'),
  password: Yup.string()
    .required('Обязательное поле')
    .min(6, 'Не менее 6 символов'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
    .required('Обязательное поле'),
});

const SignUp = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const formik = useFormik({

    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: schema,

    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.signupPath(), values);
        localStorage.setItem('user', JSON.stringify(res.data));
        const { from } = location.state || { from: { pathname: '/' } };
        auth.logIn();
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 409) {
          setAuthFailed(true);
          return;
        }
        throw err;
      }
    },
  });
  useEffect(() => {
    if (formik.isValid) {
      setAuthFailed(false);
    } else {
      setAuthFailed(true);
    }
  }, [formik.isValid]);

  return (
    <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
      <div className="card shadow-sm">
        <div className="card-body row p-5">
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <img src={image} className="rounded-circle" alt="Войти" />
          </div>
          <Form autoComplete="off" onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
            <h1 className="text-center mb-4">Регистрация</h1>
            <fieldset disabled={formik.isSubmitting}>
              <Form.Group className="form-floating mb-3" controlId="username">
                <Form.Control name="username" isInvalid={authFailed} value={formik.values.username} onChange={formik.handleChange} required placeholder="Имя пользователя" />
                <Form.Label>Имя пользователя</Form.Label>
                <Form.Control.Feedback tooltip type="invalid">
                  {formik.errors.username && (formik.errors.username)}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="form-floating mb-4" controlId="password">
                <Form.Control autoComplete="new-password" name="password" isInvalid={authFailed} value={formik.values.password} onChange={formik.handleChange} type="password" required placeholder="Пароль" />
                <Form.Label>Пароль</Form.Label>
                <Form.Control.Feedback tooltip type="invalid">
                  {formik.errors.password && (formik.errors.password)}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="form-floating mb-4" controlId="confirmPassword">
                <Form.Control name="confirmPassword" isInvalid={authFailed} value={formik.values.confirmPassword} onChange={formik.handleChange} type="password" required placeholder="Подтвердите пароль" />
                <Form.Label>Подтвердите пароль</Form.Label>
                <Form.Control.Feedback tooltip type="invalid">
                  {formik.isSubmitting || formik.isValid ? 'Такой пользователь уже существует' : (formik.errors.confirmPassword && (formik.errors.confirmPassword))}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="outline-primary w-100 mb-3" type="submit">
                Зарегистрироваться
              </Button>
            </fieldset>
          </Form>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default SignUp;
