import React, { createContext, useContext, useState } from 'react';

interface CacheContextType {
    cache: Record<string, any>;
    addToCache: (key: string, data: any) => void;
}

const CacheContext = createContext<CacheContextType | undefined>(undefined);

const CacheProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cache, setCache] = useState<Record<string, any>>({});

    const addToCache = (key: string, data: any) => {
        setCache((prevCache) => ({ ...prevCache, [key]: data }));
    };

    return (
        <CacheContext.Provider value={{ cache, addToCache }}>
            {children}
        </CacheContext.Provider>
    );
};

export const useCache = () => {
    const context = useContext(CacheContext);
    if (context === undefined) {
        throw new Error('useCache must be used within a CacheProvider');
    }
    return context;
};

export default CacheProvider;
