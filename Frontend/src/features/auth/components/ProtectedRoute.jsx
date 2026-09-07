
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { fetchDashboard, selectAuthLoading, selectIsAuthenticated } from '../states/auth.slice';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const location = useLocation();
  const sessionCheckStarted = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !loading && !sessionCheckStarted.current) {
      sessionCheckStarted.current = true;
      dispatch(fetchDashboard());
    }
  }, [dispatch, isAuthenticated, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-canvas">
        <div className="text-center">
          <svg className="spinner" viewBox="0 0 24 24" aria-hidden="true" role="status" style={{ width: '32px', height: '32px' }}>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="30 60" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
            </circle>
          </svg>
          <p className="text-body-sm text-ink-muted mt-md">Verifying session...</p>
        </div>
        <span className="sr-only">Verifying session...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
