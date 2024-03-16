import React, { useEffect, useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import './index.scss';
import LoaderIcon from '../../assets/lottie/magnifier-check.json';

interface LoaderProps {
    animationData?: any;
    speed: number;
    loop?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ animationData, speed = 1, loop = true }) => {
    const lottieRef = useRef<LottieRefCurrentProps | null>(null);

    useEffect(() => {
        // Check if the Lottie instance is available and then set the speed
        if (lottieRef.current) {
            lottieRef.current.setSpeed(speed);
        }
    }, [speed]);

    return <Lottie className='Loader' loop={loop} animationData={animationData || LoaderIcon} lottieRef={lottieRef} />;
};

export default Loader;