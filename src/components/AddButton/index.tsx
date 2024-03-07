import React from 'react';
import './index.scss';

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>+ Add</button>;
};

export default AddButton;
