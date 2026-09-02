import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  padded?: boolean;
}

const Card: React.FC<CardProps> = ({ glow = false, padded = true, className = '', children, ...rest }) => (
  <div
    className={`glass rounded-2xl shadow-card ${glow ? 'shadow-glow' : ''} ${padded ? 'p-5 md:p-6' : ''} ${className}`}
    {...rest}
  >
    {children}
  </div>
);

export default Card;
