import * as React from 'react';
import { MassTransferForm } from '../MassTransferForm/MassTransferForm';
import { LoginModal } from '../LoginModal/LoginModal';
import { ProviderWeb } from '@waves.exchange/provider-web';
import { ProviderCloud } from '@waves.exchange/provider-cloud';
import { Signer } from '@waves/signer';
import { useCallback, useContext, useState } from 'react';
import { ConfigContext } from '../../context/ConfigContext';

interface MainProps {

}

export const Main: React.FC<MainProps> = (props) => {
    const config = useContext(ConfigContext);
    const [signer, setSigner] = useState<Signer|null|undefined>(null);
    const [userAddress, setUserAddress] = useState('');
    const [onSelectSigner, setOnSelectedSigner] = useState<boolean>();
    const [loginResults, setLoginResults] = useState<any>(null);

    const onLogin = useCallback(async (provider: typeof ProviderWeb | typeof ProviderCloud) => {
        setOnSelectedSigner(false);
        setUserAddress('');
        const currentSigner = signer || new Signer({ NODE_URL: config.nodeUrl });
        currentSigner.setProvider(new provider() as any);
        setSigner(currentSigner);
        try {
            const user = await currentSigner.login();
            setUserAddress(user.address);
            loginResults && loginResults.res({ ...user, signer: currentSigner });
            return user;
        } catch (e) {
            loginResults && loginResults.rej();
            return;
        }
    }, [signer, loginResults]);


    return <div>
        <MassTransferForm />
        <LoginModal onSelect={onLogin}/>
    </div>
}
