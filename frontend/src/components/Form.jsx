import { useEffect } from 'react';
import { useState } from 'react';
import io from 'socket.io-client';

const Form = ({ value }) => {
  const [message, setMessage] = useState('');
  const socket = io();
  const handleSubmit = (e) => {
    e.preventDefault();
    const local = localStorage.getItem('user');
    const { username } = JSON.parse(local);
    socket.emit('newMessage', { body: message, channelId: value, username });
    socket.on('newMessage', (payload) => {
      console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
    });
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} noValidate="" className="py-1 border rounded-2">
      <div className="input-group has-validation">
        <input name="body" onChange={(e) => setMessage(e.target.value)} value={message} aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" />
        <button type="submit" style={{ border: 'none' }} disabled={!message} className="btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            />
          </svg>
          <span className="visually-hidden">Отправить</span>
        </button>
      </div>
    </form>
  );
};

export default Form;
