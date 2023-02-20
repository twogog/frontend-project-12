import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import axios from 'axios';
import { addChannel } from '../../slices/channelsSlice';
import routes from '../../routes';

const RenameChannel = ({ modalInfo, onHide }) => {
  const dispatch = useDispatch();
  const channelState = useSelector((state) => state.channels);
  const socket = io();
  const [addFailed, setAddFailed] = useState(false);
  const [errorMessage, setMessage] = useState('');
  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('user'));
    return { Authorization: `Bearer ${userId.token}` };
  };
  const addChn = (name) => {
    // emit new channel
    socket.emit('newChannel', { name });
    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload)); // { id: 6, name: "new channel", removable: true }
    });
  };

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    onSubmit: async (values) => {
      const { channelName } = values;
      const onlyName = channelState.channels.map((channel) => channel.name);
      if (channelName.length < 3 || onlyName.includes(channelName)) {
        if (channelName.length < 3) {
          setMessage('От 3 до 20 символов');
          setAddFailed(true);
        } else {
          setMessage('Должно быть уникальным');
          setAddFailed(true);
        }
      } else {
        addChn(channelName);
        setAddFailed(false);
        onHide();
      }
    },
  });

  return (
    <Modal centered show={modalInfo} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Переименовать канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="channelName">
              <Form.Control className="mb-2" name="channelName" isInvalid={addFailed} value={formik.values.addChanel} onChange={formik.handleChange} required />
              <Form.Label hidden />
              <div className="invalid-feedback">{errorMessage}</div>
              <div className="d-flex justify-content-end">
                <Button className="me-2" variant="secondary" onClick={onHide}>
                  Отменить
                </Button>
                <Button variant="primary" type="submit">
                  Отправить
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
  );
};

export default RenameChannel;
