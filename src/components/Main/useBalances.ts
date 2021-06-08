import { useEffect, useState } from 'react';
import { Signer } from '@waves/signer';
import { MyMoney } from '@waves/balances/src/utils';
import { Balance } from '@waves/balances';

export const useBalances = (signer: Signer|null|undefined, userAddress: string) => {
    const [userBalances, setUserBalances] = useState<Record<string, MyMoney>>({});

    useEffect(() => {
        if (userAddress) {
            const balance = new Balance({ address: userAddress, updateBalancesMs: 5000 });

            balance.onUpdate((balances) => {
                console.log('%c balances', 'color: #e5b6ed', balances);
                setUserBalances(balances);
            });
        }
    }, [userAddress]);


    // const fetchUserBalances = async (currentSigner: Signer): Promise<Record<string, Balance>> => {
    //     const balances = await currentSigner.getBalance();
    //     const balancesMap = balances.reduce<Record<string, Balance>>((acc, balance) => {
    //         acc[balance.assetId] = balance;
    //
    //         return acc;
    //     }, {});ss
    //
    //
    //     return balancesMap;
    // };
    //
    // useEffect(() => {
    //     if (!signer || !userAddress) {
    //         return;
    //     }
    //
    //     const balancesSubscription = createPolling<Record<string, Balance>>(
    //         () => fetchUserBalances(signer),
    //         60 * 1000
    //     ).subscribe((balances) => {
    //         setUserBalances(balances);
    //     });
    //
    //     return () => {
    //         balancesSubscription.unsubscribe();
    //     };
    // }, [signer, userAddress]);

    return { userBalances }
}
