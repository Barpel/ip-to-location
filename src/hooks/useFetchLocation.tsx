import axios from 'axios';

import React, { useEffect, useState } from 'react';
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
    locationData: LocationData | null;
    loading: boolean;
    error: string | null;
}


export const useFetchCountry = (ipAddress: string): FetchDataResponse => {
    const [locationData, setLocationData] = useState<LocationData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { loading, startLoading, stopLoading } = useLoading();

    const URL = 'http://ip-api.com/json';

    useEffect(() => {
        if (!ipAddress) return;

        const fetchData = async () => {
            startLoading();
            setError(null);

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
                stopLoading();
            }
        };

        fetchData();
    }, [ipAddress, startLoading, stopLoading]);

    return { locationData, loading, error };
};

