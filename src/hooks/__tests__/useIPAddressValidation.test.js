import { renderHook } from '@testing-library/react';
import { useIPAddressValidation } from '../useIPAddressValidation';

describe('useIPAddressValidation Hook', () => {
    test.each([
        ['192.168.1.1', true],
        ['255.255.255.255', true],
        ['0.0.0.0', true],
        ['192.168.1.256', false], 
        ['256.256.256.256', false], 
        ['192.168.1', false],
        ['not.an.ip', false], 
        ['1234', false], 
        ['', false], 
    ])('should validate IP address %s as %s', (ipAddress, expectedValidity) => {
        const { result } = renderHook(() => useIPAddressValidation(ipAddress));
        expect(result.current.isValidIpAddress).toBe(expectedValidity);
    });
});
