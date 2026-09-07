

const Button = ({
  children,
  variant = 'primary',
  size = 'default',
  type = 'button',
  disabled,
  loading,
  onClick,
  className = '',
  ...props
}) => {
  const baseClasses = 'text-button font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    utility: 'btn-utility',
    icon: 'btn-icon-circular',
  };

  const sizeClasses = {
    default: '',
    sm: 'px-3 py-2 text-sm',
    lg: 'px-6 py-3',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || ''} ${className}`;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={combinedClasses}
      {...props}
    >
      {loading && (
        <svg className="spinner" viewBox="0 0 24 24" aria-hidden="true" style={{ width: '16px', height: '16px', marginRight: '8px' }}>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="30 60" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
          </circle>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
