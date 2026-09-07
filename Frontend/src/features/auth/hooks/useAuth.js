import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  clearError,
  login,
  logout,
  register,
  selectAuthError,
  selectAuthLoading,
  selectIsAuthenticated,
  selectUser,
} from '../states/auth.slice';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = useCallback(
    async (credentials) => {
      try {
        await dispatch(login(credentials)).unwrap();
        navigate(from, { replace: true });
        return { success: true };
      } catch (err) {
        return { success: false, error: err };
      }
    },
    [dispatch, navigate, from]
  );

  const handleRegister = useCallback(
    async (userData) => {
      try {
        await dispatch(register(userData)).unwrap();
        navigate('/login', { replace: true });
        return { success: true };
      } catch (err) {
        return { success: false, error: err };
      }
    },
    [dispatch, navigate]
  );

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/login', { replace: true });
      return { success: true };
    } catch (err) {
      navigate('/login', { replace: true });
      return { success: false, error: err };
    }
  }, [dispatch, navigate]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    clearError: handleClearError,
  };
};

export default useAuth;
