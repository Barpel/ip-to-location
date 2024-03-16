import React from 'react';
import { ReactComponent as PlusIcon } from '../../assets/plus-circle-svgrepo-com.svg';
import './index.scss';
import { Button } from '@mui/material';

interface AddButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, disabled = false, children }) => {

  const defaultContent = (
    <>
      <PlusIcon className='standard-svg' />
      Add
    </>
  )

  return <Button
    className="addButton d-flex align-items-center justify-content-center"
    size="large"
    color="primary"
    disabled={disabled}
    onClick={onClick}>
    {children || defaultContent}
  </Button>;
};

export default AddButton;
