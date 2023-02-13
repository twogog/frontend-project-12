import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import image from '../assets/avatar.jpg';

const Authorization = () => {
  const handleForm = (e) => {
    e.preventDefault();
  };

return (
  <div className="container col-12 col-md-8 col-xxl-6">
    <div className="card shadow-sm">
    <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <img src={image} className="rounded-circle" alt="Войти" />
        </div>
    <Form onSubmit={handleForm} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label />
        <Form.Control required="true" placeholder="Ваш ник" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label />
        <Form.Control type="password" required="true" placeholder="Пароль" />
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
