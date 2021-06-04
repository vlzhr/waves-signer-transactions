import * as React from 'react';
import { Title } from '../Title/Title';
import './TxFormWrapper.scss';
import { Button } from '../Button/Button';

interface TxFormWrapperProps {
    title?: string;
    handleLogout?: () => void;
}

export const TxFormWrapper: React.FC<TxFormWrapperProps> = ({ title, handleLogout, children }) => (
    <form className='tx-form'>
        <div className='space-between'>
            <Title>{title}</Title>
            {handleLogout && <Button variant='transparent' onClick={handleLogout}>Log Out</Button>}
        </div>

        {children}
    </form>
);
