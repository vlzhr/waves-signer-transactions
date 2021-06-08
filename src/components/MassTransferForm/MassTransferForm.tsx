import * as React from 'react';
import { TxFormWrapper } from '../TxFormWrapper/TxFormWrapper';
import { SearchAsset } from '../SearchAsset/SearchAsset';
import { MyMoney } from '@waves/balances/src/utils';
import { Signer } from '@waves/signer';
import { Base58Bytes, MassTransferItem } from '@waves/ts-types/src/index';
import { useParseTransfers } from './useParseTransfers';

export interface ITransferItem {
    recipient: string;
    amount: MyMoney;
}

const TEXTAREA_PLACEHOLDER = 'Use a comma to separate recipient and the amount to send. Use\n' +
    'a new line for each recipient. \n' +
    'Example:\n' +
    'Address1,Amount1\n' +
    'Alias2,Amount2'

interface MassTransferFormProps {
    handleLogout: () => void;
    balances: Record<string, MyMoney>;
    signer: Signer;
}

export const MassTransferForm: React.FC<MassTransferFormProps> = ({ handleLogout, balances, signer }) => {
    const [selectedAsset, setAsset] = React.useState<MyMoney>();
    const [inputValue, setInputValue] = React.useState('');

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        console.log('%c e', 'color: #e5b6ed', e.target.value);
        setInputValue(e.target.value);
    }, [balances]);

    const onSelect = React.useCallback((balance: MyMoney) => {
        setAsset(balance)
    }, []);

    const handleConfirm = React.useCallback(() => {
        signer.massTransfer({
            transfers: [{ recipient: 'w', amount: 1 }],
            assetId: selectedAsset.asset.id,
            attachment: null
        });
    }, [selectedAsset]);

    const transfers = useParseTransfers(inputValue, selectedAsset);

    console.log('%c transfers', 'color: #e5b6ed', transfers);

    return <TxFormWrapper title={'Mass Transfer'} handleLogout={handleLogout} onConfirm={handleConfirm} confirmText='Transfer'>

        <div className='form__row'>
            <label className='form__label'>Select Asset</label>
            <SearchAsset balances={balances} onSelect={onSelect}/>
        </div>

        <div className='form__row'>
            <div className='space-between'>
                <label className='form__label'>Recipients, Amounts: 0/100</label>
                <span className='link'>Import CSV File</span>
            </div>
            <textarea className='input textarea' placeholder={TEXTAREA_PLACEHOLDER} onChange={handleChange}/>
        </div>

        <div>
            {'error'}
        </div>
    </TxFormWrapper>
}
