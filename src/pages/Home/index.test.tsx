import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '.';
import '@testing-library/jest-dom';
import { IPRowProps } from '../../components/IPRow';

const MOCK_LOCATION_DATA = {
    "status": "success",
    "country": "Brazil",
    "countryCode": "BR",
    "region": "SP",
    "regionName": "São Paulo",
    "city": "São Paulo",
    "zip": "",
    "lat": -23.5505,
    "lon": -46.6333,
    "timezone": "America/Sao_Paulo",
    "isp": "Huawei International Pte. Ltd.",
    "org": "Huawei BR Cloud",
    "as": "AS136907 HUAWEI CLOUDS",
    "query": "119.8.80.0"
}

jest.mock('lottie-react', () => () => <div>Lottie Animation</div>);
jest.mock('../../components/AddButton', () => ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
    <button onClick={onClick}>{children}</button>
));
jest.mock('../../components/IPRow', () => ({ id, index, handleRemoveButtonClick, handleBlur, locationData }: IPRowProps) => (
    <div data-testid={`ip-row-${id}`}>
        IP Row {index + 1}
        {locationData && <div data-testid={`locationData-${id}`}>{locationData.country}</div>}
        <button onClick={() => handleRemoveButtonClick(id)}>Remove</button>
        <button onClick={() => handleBlur(id, '', MOCK_LOCATION_DATA)}>Simulate Blur</button>
    </div>
));

describe('Home Component', () => {
    test('initially renders with one IP row', () => {
        render(<Home />);
        expect(screen.getAllByTestId(/ip-row-/i).length).toBe(1);
    });

    test('adds a new IP row when add button is clicked', () => {
        render(<Home />);
        fireEvent.click(screen.getByText('+ Add'));
        expect(screen.getAllByTestId(/ip-row-/i).length).toBe(2);
    });

    test('removes an IP row when remove button is clicked', async () => {
        render(<Home />);
        fireEvent.click(screen.getByText('+ Add'));

        fireEvent.click(screen.getAllByText('Remove')[0]);
        expect(screen.getAllByTestId(/ip-row-/i).length).toBe(1);
    });

    test('updates an IP row with location data on handleBlur', () => {
        render(<Home />);

        const simulateBlurButtons = screen.getAllByText('Simulate Blur');

        fireEvent.click(simulateBlurButtons[0]);

        expect(screen.getByTestId('locationData-1')).toHaveTextContent(MOCK_LOCATION_DATA.country);
    });

});
