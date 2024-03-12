import { useCallback, useState } from 'react';
import useLoading from './useLoading';


export interface LocationData {
    query: string;
    status: string;
    country: string;
    countryCode: string;
    region: string;
    regionName: string;
    city: string;
    zip: string;
    lat: number;
    lon: number;
    timezone: string;
    isp: string;
    org: string;
    as: string;
}

interface FetchDataResponse {
    locationData?: LocationData;
    loading: boolean;
    error: string;
    fetchData: (ipAddress: string) => void;
}


export const useFetchLocation = (): FetchDataResponse => {
    const [locationData, setLocationData] = useState<LocationData>();
    const [error, setError] = useState<string>('');
    const { loading, startLoading, stopLoading } = useLoading();

    const URL = 'http://ip-api.com/json';

    const fetchData = useCallback(async (ipAddress: string) => {
        if (!ipAddress) return;

        startLoading();
        setError('');

        try {
            const response = await fetch(`${URL}/${ipAddress}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            setLocationData(json);
        } catch (err) {
            if (err instanceof Error) setError(err.message);
            else setError('An unknown error occurred');
        } finally {
            // simulate longer loading time 
            setTimeout(() => { 
                stopLoading();
            }, 2000);
        }
    }, [startLoading, stopLoading]);

    return { locationData, loading, error, fetchData };
};

