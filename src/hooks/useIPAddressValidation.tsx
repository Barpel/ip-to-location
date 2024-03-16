import { useMemo } from 'react';

const IP_REGEX: RegExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const useIPAddressValidation = (ipAddress: string): { isValidIpAddress: boolean } => {
    const isValidIpAddress = useMemo(() => IP_REGEX.test(ipAddress), [ipAddress]);
    return { isValidIpAddress };
};
