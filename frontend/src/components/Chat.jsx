import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import routes from '../routes.js';
import { addChannels, addCurrentChannel } from '../slices/channelsSlice.js';
import { addMessages } from '../slices/messagesSlice.js';
import Form from './Form.jsx';
import DropButton from './DropDown.jsx';

const Chat = ({ showModal }) => {
  const listRef = useRef(null);
  const dispatch = useDispatch();
  const channelState = useSelector((state) => state.channels);
  const messagesState = useSelector((state) => state.messages.messages);
  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('user'));
    return { Authorization: `Bearer ${userId.token}` };
  };

  const scrollChat = () => {
    listRef.current?.lastElementChild?.scrollIntoView();
  };

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
      const {
        channels,
        messages,
      } = data;

      if (messages.length > messagesState.length) {
        console.log(1);
        dispatch(addMessages(messages));
      }
      dispatch(addChannels(channels));
    };
    fetchContent();
    scrollChat();
  }, [messagesState, dispatch, channelState]);

  const filteredMessages = messagesState
    .filter((message) => (message.channelId === channelState.currentChannel));

  const activeName = channelState.channels
    .filter((channel) => channel.id === channelState.currentChannel)
    .map((channel) => channel.name);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
            <button onClick={() => showModal('adding')} style={{ border: 'none' }} className="p-0 text-primary btn btn-group-vertical" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="black">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <ul className="nav flex-column nav-pills nav-fill px-2">
            {channelState.channels.map(({ id, name, removable }) => (
              <li key={id} className="nav-item w-100">
                {removable ? <DropButton value={name} id={id} showModal={showModal} /> : (
                  <button onClick={() => dispatch(addCurrentChannel(id))} type="button" className={`w-100 rounded-0 text-start btn ${id === channelState.currentChannel ? 'btn-secondary' : ''}`}>
                    <span className="me-1">#</span>
                    {name}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>{`# ${activeName}`}</b>
              </p>
              <span>{`${filteredMessages.length} сообщений`}</span>
            </div>
            <div id="messages-box" ref={listRef} className="chat-messages overflow-auto px-5 ">
              {filteredMessages.map(({ body, username, id }) => (
                <div key={id} className="text-break mb-2">
                  <b>{username}</b>
                  {`: ${body}`}
                </div>
              ))}
            </div>
            <div className="mt-auto px-5 py-3">
              <Form value={channelState.currentChannel} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
