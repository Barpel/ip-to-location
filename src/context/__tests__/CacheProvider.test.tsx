import React from 'react';
import { render, act, screen } from '@testing-library/react';
import CacheProvider, { useCache } from '../CacheContext';

// Mock component that uses the useCache hook
const ConsumerComponent: React.FC<{ testKey: string }> = ({ testKey }) => {
    const { cache, addToCache } = useCache();
    return (
        <div>
            <button onClick={() => addToCache(testKey, 'testValue')}>Add to Cache</button>
            <button onClick={() => addToCache(testKey, cache[testKey] ?? 'defaultValue')}>Read from Cache</button>
            <div data-testid="cacheValue">{cache[testKey]}</div>
        </div>
    );
};

describe('CacheProvider and useCache', () => {
    test('provides cache and updates it with addToCache', () => {
        render(
            <CacheProvider>
                <ConsumerComponent testKey="testReadKey" />
            </CacheProvider>
        );

        expect(screen.queryByTestId('cacheValue')).not.toHaveTextContent('testValue');

        act(() => {
            screen.getByRole('button', { name: 'Add to Cache' }).click();
        });

        expect(screen.getByTestId('cacheValue')).toHaveTextContent('testValue');
    });

    test('throws error when useCache is used outside of CacheProvider', () => {
        const originalError = console.error;
        console.error = jest.fn();

        expect(() => render(<ConsumerComponent testKey="testReadKey" />)).toThrowError(
            'useCache must be used within a CacheProvider'
        );

        console.error = originalError;
    });

    test('reads value from cache if it exists', () => {
        render(
            <CacheProvider>
                <ConsumerComponent testKey="testReadKey" />
            </CacheProvider>
        );

        act(() => {
            screen.getByRole('button', { name: 'Add to Cache' }).click();
        });

        expect(screen.getByTestId('cacheValue')).toHaveTextContent('testValue');

        act(() => {
            screen.getByRole('button', { name: 'Read from Cache' }).click();
        });

        expect(screen.getByTestId('cacheValue')).toHaveTextContent('testValue');
    });
});
