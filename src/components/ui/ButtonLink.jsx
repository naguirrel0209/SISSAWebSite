import { Link } from 'react-router-dom';

export default function ButtonLink({ to, href, variant = 'primary', children, className = '', ...props }) {
  const classes = `btn-${variant} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={classes} {...props}>
      {children}
    </Link>
  );
}
