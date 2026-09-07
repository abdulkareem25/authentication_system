import { useState, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthCard from '../components/AuthCard';
import InputField from '../components/InputField';
import Button from '../components/Button';
import useAuth from '../hooks/useAuth';
import { selectIsAuthenticated, selectAuthLoading, selectAuthError } from '../states/auth.slice';

const LoginPage = () => {
  const { login, clearError } = useAuth();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (authError) {
      clearError();
    }
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validate()) return;

      await login({
        email: formData.email.trim(),
        password: formData.password,
      });
    },
    [formData, login, validate]
  );

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const serverError =
    typeof authError === 'string'
      ? authError
      : authError?.message || authError?.error || null;

  return (
    <main className="min-h-screen bg-canvas flex items-center justify-center p-md">
      <div className="w-full" style={{ maxWidth: '400px' }}>
        <div className="text-center mb-lg">
          <Link to="/" className="text-title font-semibold text-ink no-underline">
            Authentica
          </Link>
        </div>

        <AuthCard>
          <h1 className="text-heading-2 text-ink text-center mb-lg">Sign in</h1>

          {serverError && (
            <div className="error-alert" role="alert">
              <p>{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-md" noValidate>
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
              autoComplete="email"
              required
              disabled={loading}
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Enter your password"
              autoComplete="current-password"
              showPasswordToggle
              required
              disabled={loading}
            />

            <Button type="submit" variant="primary" loading={loading} disabled={loading} className="w-full mt-xs">
              Sign in
            </Button>
          </form>

          <div className="mt-lg text-center">
            <p className="text-body-sm text-ink-muted">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="auth-link">
                Create one
              </Link>
            </p>
          </div>
        </AuthCard>
      </div>
    </main>
  );
};

export default LoginPage;
