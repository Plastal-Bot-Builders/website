import React from 'react';
import { useNavigate } from 'react-router-dom'; // If using react-router for navigation

interface ButtonProps {
  label: string;
  href: string;
}

const Button: React.FC<ButtonProps> = ({ label, href }) => {
  const navigate = useNavigate(); // For navigation (assuming react-router-dom is used)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    navigate(href); // This will handle internal navigation
  };

  return (
    <button onClick={handleClick} className="custom-button">
      {label}
    </button>
  );
};

export default Button;
