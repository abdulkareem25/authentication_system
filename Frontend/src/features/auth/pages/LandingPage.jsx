import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../states/auth.slice';

const features = [
  {
    title: 'Secure Authentication',
    description: 'Industry-standard encryption and httpOnly cookie sessions keep your account safe.',
    color: 'bg-accent-sky',
  },
  {
    title: 'Session Management',
    description: 'Automatic token refresh and seamless session persistence across page reloads.',
    color: 'bg-accent-purple',
  },
  {
    title: 'Role-Based Access',
    description: 'Granular permissions ensure the right people see the right content.',
    color: 'bg-accent-teal',
  },
  {
    title: 'Real-Time Dashboard',
    description: 'Monitor activity, manage users, and track performance from a clean workspace.',
    color: 'bg-accent-pink',
  },
];

const LandingPage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <div className="bg-canvas-soft">
      <nav className="nav-bar" aria-label="Main navigation">
        <div className="container flex items-center justify-between">
          <Link to="/" className="text-title font-semibold text-ink no-underline">
            Authentica
          </Link>
          <div className="flex items-center gap-sm">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-primary no-underline text-on-primary">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn-utility text-ink no-underline">
                  Log in
                </Link>
                <Link to="/register" className="btn-primary no-underline text-on-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <header className="hero-band">
        <div className="container text-center">
          <div className="mb-md">
            <span className="badge-pill">Secure &amp; Simple</span>
          </div>
          <h1 className="text-display-1 mb-md">Authentication that just works.</h1>
          <p className="text-body-md mb-lg mx-auto" style={{ maxWidth: '640px', color: 'rgba(255,255,255,0.75)' }}>
            A clean, secure auth system built with modern practices.
            Cookie-based sessions, protected routes, and a clean workspace dashboard.
          </p>
          <div className="flex items-center justify-center gap-sm">
            {!isAuthenticated && (
              <>
                <Link to="/register" className="btn-primary no-underline text-on-primary">
                  Get Started
                </Link>
                <Link to="/login" className="btn-secondary no-underline text-ink">
                  Sign In
                </Link>
              </>
            )}
            {isAuthenticated && (
              <Link to="/dashboard" className="btn-primary no-underline text-on-primary">
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </header>

      <section className="container py-lg" aria-labelledby="features-heading">
        <div className="text-center mb-lg">
          <h2 id="features-heading" className="text-heading-1 text-ink mb-md">Built for developers</h2>
          <p className="text-body-md text-ink-muted mx-auto" style={{ maxWidth: '560px' }}>
            Everything you need to ship authentication in minutes, not weeks.
          </p>
        </div>
        <div className="grid gap-md" style={{ gridTemplateColumns: 'repeat(1, 1fr)' }}>
          <style>{`
            @media (min-width: 768px) {
              .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (min-width: 1024px) {
              .features-grid { grid-template-columns: repeat(4, 1fr) !important; }
            }
          `}</style>
          <div className="features-grid grid gap-md">
            {features.map((feature) => (
              <article key={feature.title} className="feature-card">
                <div className={`w-3 h-3 rounded-full ${feature.color} mb-sm`} aria-hidden="true"></div>
                <h3 className="text-heading-3 text-ink mb-xs">{feature.title}</h3>
                <p className="text-body-sm text-ink-muted">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-lg" aria-labelledby="cta-heading">
        <div className="feature-card-elevated text-center" style={{ padding: '48px 32px' }}>
          <h2 id="cta-heading" className="text-heading-2 text-ink mb-md">Ready to get started?</h2>
          <p className="text-body-md text-ink-muted mb-lg mx-auto" style={{ maxWidth: '480px' }}>
            Create your account in seconds. No credit card required.
          </p>
          {!isAuthenticated ? (
            <Link to="/register" className="btn-primary no-underline text-on-primary">
              Create Free Account
            </Link>
          ) : (
            <Link to="/dashboard" className="btn-primary no-underline text-on-primary">
              Open Dashboard
            </Link>
          )}
        </div>
      </section>

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

export default LandingPage;
