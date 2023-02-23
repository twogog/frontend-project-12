import { useState } from 'react';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addCurrentChannel, idChannel } from '../slices/channelsSlice.js';

const DropButton = ({ value, id, showModal }) => {
  const channelState = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const openModalWithId = (which, idx) => {
    dispatch(idChannel(idx));
    showModal(which);
  };
  return (
    <Dropdown className="d-flex" as={ButtonGroup}>
      <Button onClick={() => dispatch(addCurrentChannel(id))} variant={id === channelState.currentChannel ? 'secondary' : 'white'} className="w-100 rounded-0 text-start text-truncate">{`# ${value}`}</Button>

      <Dropdown.Toggle split variant={id === channelState.currentChannel ? 'secondary' : 'white'} className="flex-grow-0">
        <span hidden>Управление каналом</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => openModalWithId('removing', id)} href="#/action-1">Удалить</Dropdown.Item>
        <Dropdown.Item onClick={() => openModalWithId('renaming', id)} href="#/action-2">Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropButton;
