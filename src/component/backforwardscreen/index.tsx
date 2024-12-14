import React from 'react';
import './index.css';

interface NavigationButtonProps {
  icon?: React.ReactNode;
  label?: string; 
  onClick?: () => void; 
  isDisabled?: boolean; 
  next?:string;
  classname?:any;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ icon, label, onClick, isDisabled,next,classname }) => {
  return (
    <button className="navigation-button" onClick={onClick} disabled={isDisabled}>
      <div className="button-content">
        {icon && <div className="icon-container">{icon}</div>}
        <span className={classname ? classname : "button-lable-back"}>{label}</span>

      </div>
      <div>
        {next}
      </div>
    </button>
  );
};

export default NavigationButton;
