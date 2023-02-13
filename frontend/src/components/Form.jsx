import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import axios from 'axios';
import image from '../assets/avatar.jpg';

const Authorization = () => {
//   axios.post('/api/v1/login', { username: 'admin', password: 'admin' }).then((response) => {
//     console.log(response.data); // => { token: ..., username: 'admin' }
//   });
//   axios.post('/api/v1/signup', { username: 'newuser', password: '123456' }).then((response) => {
//     console.log(response.data); // => { token: ..., username: 'newuser' }
//   });
  axios.get('/api/v1/data').then((response) => {
    console.log(response.data); // => { channels: [...], currentChannelId: 1, messages: [] }
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    onSubmit: (values) => {
      JSON.stringify(values);
    },

  });

  return (
    <div className="container col-12 col-md-8 col-xxl-6">
      <div className="card shadow-sm">
        <div className="card-body row p-5">
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <img src={image} className="rounded-circle" alt="Войти" />
          </div>
          <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
            <h1 className="text-center mb-4">Войти</h1>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label />
              <Form.Control name="name" value={formik.values.name} onChange={formik.handleChange} required="true" placeholder="Ваш ник" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label />
              <Form.Control name="password" value={formik.values.password} onChange={formik.handleChange} type="password" required="true" placeholder="Пароль" />
            </Form.Group>
            <Button variant="outline-primary w-100 mb-3" type="submit">
              Войти
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
