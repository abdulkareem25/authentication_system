import { useState, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import InputField from '../components/InputField';
import Button from '../components/Button';
import useAuth from '../hooks/useAuth';

const RegisterPage = () => {
  
  const { register, isAuthenticated, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
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
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.password) newErrors.password = 'Password is required';

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      // Call the register function from the useAuth hook
      const result = await register(formData);

      if (!result.success) {
        setErrors({ general: result.error });
      }
    },
    [formData, register]
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
          <h1 className="text-heading-2 text-ink text-center mb-lg">Create account</h1>

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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
            />

            <Button type="submit" variant="primary" loading={isLoading} disabled={isLoading} className="w-full mt-xs">
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
