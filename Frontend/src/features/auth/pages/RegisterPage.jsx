import { useState, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthCard from '../components/AuthCard';
import InputField from '../components/InputField';
import Button from '../components/Button';
import useAuth from '../hooks/useAuth';
import { selectIsAuthenticated, selectAuthLoading, selectAuthError } from '../states/auth.slice';

const RegisterPage = () => {
  const { register, clearError } = useAuth();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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

      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });
    },
    [formData, register, validate]
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
          <h1 className="text-heading-2 text-ink text-center mb-lg">Create account</h1>

          {serverError && (
            <div className="error-alert" role="alert">
              <p>{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-md" noValidate>
            <InputField
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Your full name"
              autoComplete="name"
              required
              disabled={loading}
            />

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
              placeholder="At least 6 characters"
              autoComplete="new-password"
              showPasswordToggle
              required
              disabled={loading}
            />

            <Button type="submit" variant="primary" loading={loading} disabled={loading} className="w-full mt-xs">
              Create account
            </Button>
          </form>

          <div className="mt-lg text-center">
            <p className="text-body-sm text-ink-muted">
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </p>
          </div>
        </AuthCard>
      </div>
    </main>
  );
};

export default RegisterPage;
