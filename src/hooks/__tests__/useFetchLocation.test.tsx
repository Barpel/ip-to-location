import { renderHook, waitFor, act } from '@testing-library/react';
import { useFetchLocation } from '../useFetchLocation';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();
});

test('hook sets loading correctly', async () => {
    const { result } = renderHook(() => useFetchLocation());

    act(() => {
        result.current.fetchData('123.123.123.123');
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
        expect(result.current.loading).toBeFalsy();
    }, {timeout: 3000});

});

test('hook fetches and sets location data correctly', async () => {
    const mockLocationData = {
        country: 'Country',
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockLocationData));

    const { result } = renderHook(() => useFetchLocation());

    act(() => {
        result.current.fetchData('123.123.123.123');
    });

    await waitFor(() => expect(result.current.locationData).toEqual(mockLocationData));

    expect(result.current.error).toBe('');
});

test('hook handles fetch error correctly', async () => {
    fetchMock.mockReject(new Error('Failed to fetch'));

    const { result } = renderHook(() => useFetchLocation());

    act(() => {
        result.current.fetchData('123.123.123.123');
    });

    await waitFor(() => expect(result.current.error).toBe('Failed to fetch'));

    expect(result.current.locationData).toBeUndefined();
});

test('hook sets an error when fetch response is not ok', async () => {
    fetchMock.mockResponseOnce('', { status: 404 });

    const { result } = renderHook(() => useFetchLocation());

    act(() => {
        result.current.fetchData('wrong.ip.address');
    });

    await waitFor(() => expect(result.current.error).toBe('Network response was not ok'));
});

test('hook does not attempt fetch when IP address is not provided', async () => {
    const { result } = renderHook(() => useFetchLocation());

    act(() => {
        result.current.fetchData('');
    });

    expect(fetchMock.mock.calls.length).toEqual(0);
    expect(result.current.loading).toBe(false);
});
