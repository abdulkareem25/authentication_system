import { useState } from 'react';
import AuthCard from '../components/AuthCard';
import Button from '../components/Button';
import useAuth from '../hooks/useAuth';

const DashboardPage = () => {
  const { user, isAuthenticated, isLoading, error, fetchDashboardData, logout } = useAuth();

  const [dashboardData, setDashboardData] = useState(null);
  
  // Fetch dashboard data when the component mounts
  useState(() => {
    const fetchData = async () => {
      const result = await fetchDashboardData();
      if (result.success) {
        setDashboardData(result.dashboardData);
      }
    };

    fetchData();
  }, [fetchDashboardData]);
  
  if (isLoading && !user) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="text-center">
          <svg className="spinner" viewBox="0 0 24 24" aria-hidden="true" style={{ width: '32px', height: '32px' }}>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="30 60" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
            </circle>
          </svg>
          <p className="text-body-sm text-ink-muted mt-md">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-canvas">
      <header className="nav-bar">
        <div className="container flex flex-wrap items-center justify-between gap-sm">
          <span className="text-title font-semibold text-ink">Authentica</span>
          <div className="flex items-center gap-sm">
            <span className="text-body-sm text-ink-muted sm:inline">
              {user?.email}
            </span>
            <Button variant="utility" onClick={logout} disabled={!isAuthenticated}>
              Log out
            </Button>
          </div>
        </div>
      </header>

      <main className="dashboard-content py-lg px-md">
        <div className="mb-lg">
          <h1 className="text-heading-1 dashboard-heading text-ink mb-xs">Welcome back{user?.name ? `, ${user.name}` : ''}</h1>
          <p className="text-body-md text-ink-muted">Manage your account and view your session details.</p>
        </div>

        <div className="dashboard-grid grid gap-md" style={{ gridTemplateColumns: '1fr' }}>
          <style>{`
            @media (min-width: 768px) {
              .dashboard-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>
          <div className="dashboard-cards-grid grid gap-md">
            <AuthCard>
              <h2 className="text-heading-3 text-ink mb-md">User Profile</h2>
              <div className="flex flex-col gap-sm">
                <div className="flex justify-between items-center py-xxs border-b border-hairline">
                  <span className="text-body-sm text-ink-muted">User ID</span>
                  <span className="text-body-sm text-ink font-medium truncate" style={{ maxWidth: '180px' }}>{user?.id || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center py-xxs border-b border-hairline">
                  <span className="text-body-sm text-ink-muted">Name</span>
                  <span className="text-body-sm text-ink font-medium">{user?.name || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center py-xxs border-b border-hairline">
                  <span className="text-body-sm text-ink-muted">Email</span>
                  <span className="text-body-sm text-ink font-medium truncate" style={{ maxWidth: '180px' }}>{user?.email || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center py-xxs">
                  <span className="text-body-sm text-ink-muted">Account Created</span>
                  <span className="text-body-sm text-ink font-medium">{formatDate(user?.createdAt)}</span>
                </div>
              </div>
            </AuthCard>

            <AuthCard>
              <h2 className="text-heading-3 text-ink mb-md">Session Details</h2>
              <div className="flex flex-col gap-sm">
                <div className="flex justify-between items-center py-xxs border-b border-hairline">
                  <span className="text-body-sm text-ink-muted">Status</span>
                  <span className="badge-pill badge-success">
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center py-xxs border-b border-hairline">
                  <span className="text-body-sm text-ink-muted">Session Type</span>
                  <span className="text-body-sm text-ink font-medium">Cookie (httpOnly)</span>
                </div>
                <div className="flex justify-between items-center py-xxs border-b border-hairline">
                  <span className="text-body-sm text-ink-muted">SameSite Policy</span>
                  <span className="text-body-sm text-ink font-medium">Strict</span>
                </div>
                <div className="flex justify-between items-center py-xxs">
                  <span className="text-body-sm text-ink-muted">Server Message</span>
                  <span className="text-body-sm text-ink font-medium truncate" style={{ maxWidth: '180px' }}>{dashboardData?.message || 'Session verified'}</span>
                </div>
              </div>
            </AuthCard>
          </div>
        </div>

        {error && (
          <div className="error-alert mt-md">
            <p>{typeof error === 'string' ? error : error?.message || 'An error occurred'}</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-md">
          <p className="text-caption text-ink-muted">
            &copy; {new Date().getFullYear()} Authentica. All rights reserved.
          </p>
          <div className="flex items-center gap-md">
            <span className="text-caption text-ink-faint">Privacy</span>
            <span className="text-caption text-ink-faint">Terms</span>
            <span className="text-caption text-ink-faint">Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
