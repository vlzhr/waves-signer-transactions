import * as React from 'react';
import { TxFormWrapper } from '../TxFormWrapper/TxFormWrapper';

const TEXTAREA_PLACEHOLDER = 'Use a comma to separate recipient and the amount to send. Use\n' +
    'a new line for each recipient. \n' +
    'Example:\n' +
    'Address1,Amount1\n' +
    'Alias2,Amount2'

interface MassTransferFormProps {
    handleLogout: () => void;
}

export const MassTransferForm: React.FC<MassTransferFormProps> = ({ handleLogout }) => {


    return <TxFormWrapper title={'Mass Transfer'} handleLogout={handleLogout} >

        <div className='form__row'>
            <label className='form__label'>Select Asset</label>
            <input className='form__asset-input' type='text' placeholder='Type asset name'/>
        </div>

        <div className='form__row'>
            <div className='space-between'>
                <label className='form__label'>Recipients, Amounts: 0/100</label>
                <span className='link'>Import CSV File</span>
            </div>
            <textarea className='form__asset-input textarea' placeholder={TEXTAREA_PLACEHOLDER}/>
        </div>

        <div>
            {'error'}
        </div>
    </TxFormWrapper>
}
