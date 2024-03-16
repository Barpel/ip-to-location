import { renderHook, act } from '@testing-library/react';
import useLoading from '../useLoading';

describe('useLoading Hook', () => {
    test('initial loading state should be false', () => {
        const { result } = renderHook(() => useLoading());
        expect(result.current.loading).toBe(false);
    });

    test('startLoading should set loading to true', () => {
        const { result } = renderHook(() => useLoading());

        act(() => {
            result.current.startLoading();
        });

        expect(result.current.loading).toBe(true);
    });

    test('stopLoading should set loading to false after startLoading', () => {
        const { result } = renderHook(() => useLoading());

        act(() => {
            result.current.startLoading();
        });

        expect(result.current.loading).toBe(true);

        act(() => {
            result.current.stopLoading();
        });

        expect(result.current.loading).toBe(false);
    });
});
