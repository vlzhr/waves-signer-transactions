import * as React from 'react';
import { ProviderCloud } from '@waves.exchange/provider-cloud';
import { ProviderWeb } from '@waves.exchange/provider-web';
import './LoginModal.scss';
import { Title } from '../Title/Title';

interface LoginModalProps {
    onSelect: (type: typeof ProviderCloud | typeof ProviderWeb) => any;
    onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onSelect, onClose }) => {

    const selectWeb = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        onSelect(ProviderWeb);
    }
    const selectCloud = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        onSelect(ProviderCloud)
    };

    return <form className='login-container'>
        <Title>Connect wallet</Title>
        <h2 className='login-container-title'>Connect wallet</h2>
        <div className='buttons-wrapper'>
            <button className='login-btn storage' onClick={selectWeb}>Waves Exchange Storage</button>
            <button className='login-btn email' onClick={selectCloud}>Email Account</button>
        </div>
        <button onClick={onClose}>Close</button>
    </form>
};
