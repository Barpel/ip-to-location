import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import './index.scss';
import { LocationData, useFetchLocation } from '../../hooks/useFetchLocation';
import { useCache } from '../../context/CacheContext';
import Loader from '../Loader';
import { useIPAddressValidation } from '../../hooks/useIPAddressValidation';


export interface IPGeoLocationInputProps {
    inputId: number;
    onBlur: (inputId: number, error: string, locationData?: LocationData) => void;
}


const IPGeoLocationInput: React.FC<IPGeoLocationInputProps> = ({ inputId, onBlur }) => {
    const [ipAddress, setIpAddress] = useState<string>('');
    const [error, setError] = useState<string>('');

    const { fetchData, locationData, error: FetchingError, loading } = useFetchLocation()

    const { isValidIpAddress } = useIPAddressValidation(ipAddress);
    const { cache, addToCache } = useCache();

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setIpAddress(e.target.value);
    };

    async function handleBlur(): Promise<void> {
        if (!!ipAddress) {
            if (!isValidIpAddress) {
                setError('Please enter a valid IP address');
                return;
            }
            setError('');
            if (!cache[ipAddress]) {
                await fetchData(ipAddress);
                addToCache(ipAddress, locationData);
            }
        }
    };

    useEffect(() => {
        if (locationData && !loading) {
            onBlur(inputId, FetchingError, locationData);
        }
    }, [inputId, locationData, onBlur, FetchingError, loading])


    return (
        <div className='ipGeoLocationInput d-flex justify-content-start align-items-center flex-row'>
            <TextField
                fullWidth
                disabled={loading}
                color={isValidIpAddress ? 'success' : 'secondary'}
                label='IP Address'
                error={!!error && !!ipAddress}
                type="text" value={ipAddress}
                InputProps={{ onBlur: () => handleBlur() }}
                onFocus={() => setError('')}
                onChange={handleInputChange} />
            {loading && <Loader speed={0.78} loop={false} />}
            {!!error && <p className='error'>{error}</p>}
        </div>
    );
};

export default IPGeoLocationInput;
