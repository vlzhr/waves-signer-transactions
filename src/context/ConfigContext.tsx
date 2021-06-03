import { createContext } from 'react';

export type ConfigContextType = {
    nodeUrl: string;
    signerClientUrl: string;
    explorerUrl: string;
};

export const ConfigContext = createContext<ConfigContextType>({
    nodeUrl: '',
    signerClientUrl: '',
    explorerUrl: ''
});

ConfigContext.displayName = 'ConfigContext';

export const ConfigContextProvider = ConfigContext.Provider;
