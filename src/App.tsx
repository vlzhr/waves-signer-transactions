import React from 'react';
import './App.scss';
import { Main } from './components/Main/Main';
import { ConfigContextProvider, ConfigContextType } from './context/ConfigContext';
import { ModalProvider } from './components/Modal/Modal';


const config: ConfigContextType = require(`./configs/config-${process.env.REACT_APP_NETWORK || 'mainnet'}.json`);

function App() {
    return (
        <div className="App">
            <ModalProvider>
                <ConfigContextProvider value={config}>
                    <Main/>
                </ConfigContextProvider>
            </ModalProvider>
        </div>
    );
}

export default App;
