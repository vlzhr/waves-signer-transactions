import { parse } from 'papaparse';
import { useEffect, useState } from 'react';
import { BigNumber } from '@waves/bignumber';
import { ITransferItem } from './MassTransferForm';
import { MyMoney } from '@waves/balances';

const isEqual = (a: ITransferItem[], b: ITransferItem[]): boolean => {
    return a.length === b.length && a.every((item, i) => {
        return item.recipient === b[i].recipient && item.amount.eq(b[i].amount);
    });
}

const parseAmount = (amountString: string) => {
    const validate = /^([0-9]+\.)?[0-9]+$/;
    const amount = amountString
        .replace(new RegExp('\\,', 'g'), '')
        .replace(new RegExp('\\.'), '.')
        .replace(',', '.');

    if (!validate.test(amount)) {
        return new BigNumber(0);
    }

    return new BigNumber(amount);
}

const getRecipientHashByCSVParseResult = (data: string[][]): Record<string, string[]> => {
    const recipientHash = Object.create(null);
    data.forEach((item) => {
        if (!item.length) {
            return null;
        }

        const [recipient, amountString] = item.map((text) => text.replace(/\s/g, '').replace(/"/g, ''));
        if (!(recipient && amountString)) {
            return null;
        }

        if (!recipientHash[recipient]) {
            recipientHash[recipient] = [];
        }

        recipientHash[recipient].push(amountString);
    });
    return recipientHash;
}

export const useParseTransfers = (content: string, selectedAsset: MyMoney): { transfers: ITransferItem[] } => {
    const [transfers, setTransfers] = useState<ITransferItem[]>([]);

    useEffect(() => {
        if (!content || !selectedAsset) {
            return;
        }

        const { data } = parse(content || '');


        const recipientHash = getRecipientHashByCSVParseResult(data);
        const newTransfers = [];

        Object.keys(recipientHash).forEach((recipient) => {
            const amountNum = recipientHash[recipient]
                .map((amount) => {
                    try {
                        return parseAmount(amount);
                    } catch (e) {
                        return new BigNumber(0);
                    }
                })
                .reduce((result, item) => result.add(item));
            const amount = selectedAsset.cloneWithTokens(amountNum);
            newTransfers.push({ recipient, amount });
        });

        if (!isEqual(transfers, newTransfers)) {
            setTransfers(newTransfers);
        }

    }, [content, transfers])

    return { transfers }
};
