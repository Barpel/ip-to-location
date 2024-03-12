import React from 'react';
import Lottie from 'lottie-react';
import AnimatedLocationIcon from '../../assets/lottie/wired-gradient-18-location-pin.json'
import './index.scss';


const NavBar: React.FC = () => {
  return (
    <nav className='navBar d-flex align-items-center'>
      <Lottie className='standard-svg' loop={false} animationData={AnimatedLocationIcon}/>
      <span>
        IP Lookup
      </span>
    </nav>
  );
};

export default NavBar;
