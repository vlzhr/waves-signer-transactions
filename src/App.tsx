import React from 'react';
import './App.css';
import { Main } from './components/Main/Main';
import { ConfigContextProvider, ConfigContextType } from './context/ConfigContext';

const config: ConfigContextType = require(`./configs/config-${process.env.NEXT_PUBLIC_APP_NETWORK || 'mainnet'}.json`);

function App() {
    return (
        <div className="App">
            <ConfigContextProvider value={config}>
                <Main/>
            </ConfigContextProvider>
        </div>
    );
}

export default App;
