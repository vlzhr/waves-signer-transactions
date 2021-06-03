import * as React from 'react';

const TEXTAREA_PLACEHOLDER = 'Use a comma to separate recipient and the amount to send. Use\n' +
    'a new line for each recipient. \n' +
    'Example:\n' +
    'Address1,Amount1\n' +
    'Alias2,Amount2'

interface MassTransferFormProps {

}

export const MassTransferForm: React.FC<MassTransferFormProps> = (props) => {


    return <form className='ms-form'>
        <h1 className='ms-form__header'>Mass Transfer</h1>

        <div className='form-row'>
            <label className='form-label'>Select Asset</label>
            <input className='form-asset-input' type='text' placeholder='Type asset name'/>
        </div>

        <div>
            <div>
                <label>Recipients, Amounts: 0/100</label>
                <span>Import CSV File</span>
            </div>
            <textarea placeholder={TEXTAREA_PLACEHOLDER}/>
        </div>

        <div>
            {'error'}
        </div>
    </form>
}
