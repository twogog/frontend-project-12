import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import axios from 'axios';
import { addChannel } from '../../slices/channelsSlice';
import routes from '../../routes';

const RemoveChannel = ({ modalInfo, onHide }) => {
  const dispatch = useDispatch();
  const channelState = useSelector((state) => state.channels);
  const socket = io();
  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('user'));
    return { Authorization: `Bearer ${userId.token}` };
  };
  const removeChn = (name) => {
    // emit new channel
    socket.emit('newChannel', { name });
    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload)); // { id: 6, name: "new channel", removable: true }
    });
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
          <button type="button" className="btn btn-danger">Удалить</button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
