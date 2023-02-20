import { useState } from 'react';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addCurrentChannel } from '../slices/channelsSlice.js';

const DropButton = ({ value, id, showModal }) => {
  const channelState = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  return (
    <Dropdown className="d-flex" as={ButtonGroup}>
      <Button onClick={() => dispatch(addCurrentChannel(id))} variant={id === channelState.currentChannel ? 'secondary' : 'white'} className="w-100 rounded-0 text-start text-truncate">{`# ${value}`}</Button>

      <Dropdown.Toggle split variant={id === channelState.currentChannel ? 'secondary' : 'white'} className="flex-grow-0" />

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => showModal('removing')} href="#/action-1">Удалить</Dropdown.Item>
        <Dropdown.Item onClick={() => showModal('renaming')} href="#/action-2">Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropButton;
