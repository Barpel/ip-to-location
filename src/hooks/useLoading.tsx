import { useState, useCallback } from 'react';

interface UseLoadingReturn {
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const useLoading = (): UseLoadingReturn => {
  const [loading, setLoading] = useState<boolean>(false);

  const startLoading = useCallback(() => setLoading(true), []);
  const stopLoading = useCallback(() => setLoading(false), []);

  return { loading, startLoading, stopLoading };
};

export default useLoading;
