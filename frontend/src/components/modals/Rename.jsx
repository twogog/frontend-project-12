import { io } from 'socket.io-client';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { renameChannel } from '../../slices/channelsSlice';

const RenameChannel = ({ modalInfo, onHide }) => {
  const dispatch = useDispatch();
  const channelState = useSelector((state) => state.channels);
  const refer = useRef(null);
  const prevValue = channelState.channels.filter((channel) => channel.id === channelState.modalId);
  const socket = io();
  const [addFailed, setAddFailed] = useState(false);
  const [errorMessage, setMessage] = useState('');

  useEffect(() => {
    refer.current.value = prevValue[0].name;
  }, []);

  const renameChn = (name) => {
    const id = channelState.modalId;
    // subscribe rename channel
    socket.on('renameChannel', (payload) => {
      dispatch(renameChannel(payload)); // { id: 7, name: "new name channel", removable: true }
    });

    // emit rename channel
    socket.emit('renameChannel', { id, name });
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
        renameChn(channelName);
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
              <Form.Control ref={refer} className="mb-2" name="channelName" isInvalid={addFailed} value={formik.values.addChanel} onChange={formik.handleChange} required />
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
