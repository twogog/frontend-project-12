import { useContext } from 'react';

import { AuthContext as authContext } from '../contexts/index.jsx';

const useAuth = () => useContext(authContext);

export default useAuth;
