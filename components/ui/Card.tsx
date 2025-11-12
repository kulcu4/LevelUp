import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-base-200/50 backdrop-blur-sm border border-base-300/50 rounded-xl shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;