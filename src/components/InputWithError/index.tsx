import React, { useEffect, useMemo, useState } from 'react';
import { TextField } from '@mui/material';
import './index.scss';
import { LocationData, useFetchLocation } from '../../hooks/useFetchLocation';
import { useCache } from '../../context/CacheContext';

// this can be moved to a shared file in case we want different validations for a generalized input
const IP_REGEX = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export interface InputWithErrorProps {
    inputId: string;
    onBlur: (inputId: string, error: string, loading: Boolean, locationData?: LocationData) => void;
}


const InputWithError: React.FC<InputWithErrorProps> = ({ inputId, onBlur }) => {
    const [ipAddress, setIpAddress] = useState<string>('');
    const [error, setError] = useState<string>('');

    const { fetchData, locationData, error: FetchingError, loading } = useFetchLocation()

    const isValidIpAddress = useMemo(() => IP_REGEX.test(ipAddress), [ipAddress]);
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
            onBlur(inputId, FetchingError, loading, locationData);
        }
    }, [inputId, locationData, onBlur, loading, FetchingError])


    return (
        <div className='inputWrapper d-flex justify-content-start flex-column'>
            <TextField
                disabled={loading}
                color={isValidIpAddress ? 'success' : 'secondary'}
                fullWidth
                label='IP Address'
                error={!!error && !!ipAddress}
                type="text" value={ipAddress}
                InputProps={{ onBlur: () => handleBlur() }}
                onFocus={() => setError('')}
                onChange={handleInputChange} />
            {!!error && <p className='error'>{error}</p>}
        </div>
    );
};

export default InputWithError;
