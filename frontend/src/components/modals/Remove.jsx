import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { removeChannel } from '../../slices/channelsSlice';

const RemoveChannel = ({ modalInfo, onHide }) => {
  const dispatch = useDispatch();
  const channelState = useSelector((state) => state.channels);
  const socket = io();

  const removeChn = () => {
    // emit new channel
    const id = channelState.modalId;
    socket.emit('removeChannel', { id });
    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload.id));
    });
    onHide();
  };

  return (
    <Modal centered show={modalInfo} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <button type="button" onClick={onHide} className="me-2 btn btn-secondary">Отменить</button>
          <button type="button" onClick={removeChn} className="btn btn-danger">Удалить</button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
