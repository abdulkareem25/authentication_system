import { useState, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import InputField from '../components/InputField';
import Button from '../components/Button';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {

  const { login, isAuthenticated, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Reset errors
      setErrors({});

      // Basic validation
      const newErrors = {};
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.password) newErrors.password = 'Password is required';

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      // Call the login function from the useAuth hook
      const result = await login(formData);

      if (!result.success) {
        setErrors({ general: result.error });
      }
    },
    [formData, login]
  );

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

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
              disabled={isLoading}
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
              disabled={isLoading}
            />

            <Button type="submit" variant="primary" loading={isLoading} disabled={isLoading} className="w-full mt-xs">
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
