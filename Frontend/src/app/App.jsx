import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../features/auth/hooks/useAuth';

const App = () => {
  const { checkAuth } = useAuth();
  const checkStarted = useRef(false);

  useEffect(() => {
    if (checkStarted.current) return;

    checkStarted.current = true;
    checkAuth();
  }, [checkAuth]);

  return <Outlet />;
};

export default App;
