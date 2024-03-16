import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import IPGeoLocationInput from './index';
import { useFetchLocation } from '../../hooks/useFetchLocation';
import { useCache } from '../../context/CacheContext';
import { useIPAddressValidation } from '../../hooks/useIPAddressValidation';


jest.mock('../../hooks/useFetchLocation', () => ({
    useFetchLocation: jest.fn()
}));

jest.mock('../../context/CacheContext', () => ({
    useCache: jest.fn()
}));

jest.mock('../../hooks/useIPAddressValidation', () => ({
    useIPAddressValidation: jest.fn()
}));

jest.mock('lottie-react', () => () => <div>Lottie Animation</div>);


describe('IPGeoLocationInput Component', () => {
    const inputId = 1;
    const mockOnBlur = jest.fn();
    const mockUseFetchLocationReturnObject = {
        fetchData: jest.fn(async () => { }),
        locationData: { country: 'Dummy Country' },
        error: '',
        loading: false,
    };
    const mockUseCacheReturnValue = {
        cache: {},
        addToCache: jest.fn(),
    }


    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should display the input field with no initial error message', () => {
        (useFetchLocation as jest.Mock).mockReturnValue(mockUseFetchLocationReturnObject);
        (useCache as jest.Mock).mockReturnValue(mockUseCacheReturnValue);
        (useIPAddressValidation as jest.Mock).mockReturnValue({ isValidIpAddress: true });
        render(<IPGeoLocationInput inputId={inputId} onBlur={mockOnBlur} />);
        expect(screen.getByLabelText('IP Address')).toBeInTheDocument();
        expect(screen.queryByText('Please enter a valid IP address')).toBeNull();
    });

    it('should update the input field on user input', () => {
        (useFetchLocation as jest.Mock).mockReturnValue(mockUseFetchLocationReturnObject);
        (useCache as jest.Mock).mockReturnValue(mockUseCacheReturnValue);
        (useIPAddressValidation as jest.Mock).mockReturnValue({ isValidIpAddress: true });
        render(<IPGeoLocationInput inputId={inputId} onBlur={mockOnBlur} />);
        const inputElement = screen.getByLabelText('IP Address') as HTMLInputElement;
        fireEvent.change(inputElement, { target: { value: '123.123.123.123' } });
        expect(inputElement.value).toBe('123.123.123.123');
    });

    it('displays an error message for invalid IP addresses on blur', async () => {
        (useFetchLocation as jest.Mock).mockReturnValue(mockUseFetchLocationReturnObject);
        (useCache as jest.Mock).mockReturnValue(mockUseCacheReturnValue);
        (useIPAddressValidation as jest.Mock).mockReturnValue({ isValidIpAddress: false });

        render(<IPGeoLocationInput inputId={inputId} onBlur={mockOnBlur} />);
        const inputElement = screen.getByLabelText('IP Address');
        fireEvent.change(inputElement, { target: { value: 'invalidIP' } });
        fireEvent.blur(inputElement);

        const errorMessage = await screen.findByText('Please enter a valid IP address');
        expect(errorMessage).toBeInTheDocument();
    });

    it('uses cached data if available, avoiding fetch call', async () => {
        (useFetchLocation as jest.Mock).mockReturnValue(mockUseFetchLocationReturnObject);
        (useIPAddressValidation as jest.Mock).mockReturnValue({ isValidIpAddress: true });

        const cacheData = {
            '123.123.123.123': {
                country: mockUseFetchLocationReturnObject.locationData.country
            }
        };
        const fetchDataMock = jest.fn();

        (useCache as jest.Mock).mockReturnValue({
            cache: cacheData,
            addToCache: jest.fn(),
        });


        render(<IPGeoLocationInput inputId={inputId} onBlur={mockOnBlur} />);
        const inputElement = screen.getByLabelText('IP Address');
        fireEvent.change(inputElement, { target: { value: '123.123.123.123' } });
        fireEvent.blur(inputElement);

        expect(fetchDataMock).not.toHaveBeenCalled();
        expect(mockOnBlur).toHaveBeenCalledWith(inputId, '', cacheData['123.123.123.123']);
    });

    it('shows loader when fetching data', async () => {
        (useFetchLocation as jest.Mock).mockReturnValue({
            fetchData: jest.fn(async () => { }),
            locationData: null,
            error: '',
            loading: true,
        });
        (useCache as jest.Mock).mockReturnValue(mockUseCacheReturnValue);
        (useIPAddressValidation as jest.Mock).mockReturnValue({ isValidIpAddress: true });

        render(<IPGeoLocationInput inputId={inputId} onBlur={mockOnBlur} />);
        fireEvent.change(screen.getByLabelText('IP Address'), { target: { value: 'newIP' } });
        fireEvent.blur(screen.getByLabelText('IP Address'));

        const loaderElement = await screen.findByText('Lottie Animation');
        expect(loaderElement).toBeInTheDocument();
    });
});

