import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Authorization from './Form';
import Chat from './Chat';
import NotFound from './NotFound';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Chat />} />
      <Route path="login" element={<Authorization />} />
    </Routes>
  </BrowserRouter>
);

export default App;
