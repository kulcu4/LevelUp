import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-base-200/50 backdrop-blur-sm border border-base-300/50 rounded-xl shadow-lg transition-all duration-300 hover:border-teal-400/50 hover:-translate-y-1 ${className}`}>
      {children}
    </div>
  );
};

export default Card;