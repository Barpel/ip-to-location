import React from 'react';
import { ReactComponent as PlusIcon } from '../../assets/plus-circle-svgrepo-com.svg';
import './index.scss';
import { Button } from '@mui/material';

interface AddButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, children }) => {

  const defaultContent = (
    <>
      <PlusIcon className='standard-svg' />
      Add
    </>
  )

  return <Button
    className="addButton d-flex align-items-center justify-content-center"
    variant="contained"
    size="large"
    color="secondary"
    onClick={onClick}>
    {children || defaultContent}
  </Button>;
};

export default AddButton;
