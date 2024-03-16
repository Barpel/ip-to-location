import React, { useState, useEffect } from 'react';
import './index.scss';

interface LocalTimeProps {
    timezone: string;
}

const LocalTime: React.FC<LocalTimeProps> = ({ timezone }) => {
    // Function to format the time
    const formatLocalTime = (tz: string): string => {
        const options: Intl.DateTimeFormatOptions = {
            timeZone: tz,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        return new Intl.DateTimeFormat('en-US', options).format(new Date());
    };

    // Initialize localTime with the current time using formatLocalTime
    const [localTime, setLocalTime] = useState<string>(() => formatLocalTime(timezone));

    useEffect(() => {
        const updateLocalTime = () => {
            setLocalTime(formatLocalTime(timezone));
        };

        // Update the time immediately and also every second
        updateLocalTime(); // This call ensures the time is rendered ASAP
        const timerId = setInterval(updateLocalTime, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(timerId);
    }, [timezone]); // Re-run the effect if the timezone changes

    return <p className='localTime'>{localTime}</p>;
};

export default LocalTime;