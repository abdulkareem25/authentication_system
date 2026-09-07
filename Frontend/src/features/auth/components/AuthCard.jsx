const AuthCard = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`ex-auth-form-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default AuthCard;