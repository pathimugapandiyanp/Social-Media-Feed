import React from 'react';

interface ButtonProps {
  backgroundColor?: string;
  color?: string;
  leftIcon?: React.ReactNode;
  labelText?: string;
  borderRadius?: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  backgroundColor,
  color,
  leftIcon,
  labelText,
  borderRadius,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={className}
  
    >
      {leftIcon && <span style={{ marginRight: '8px' }}>{leftIcon}</span>}

      {labelText && labelText}
    </button>
  );
};

export default Button;
