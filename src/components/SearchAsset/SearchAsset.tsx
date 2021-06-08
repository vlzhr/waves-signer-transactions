import * as React from 'react';
import { MyMoney } from '@waves/balances/src/utils';
import { useEffect } from 'react';
import './SearchAsset.scss';
import { useClickOut } from '../../shared/useOutsideClick';

interface SearchInputProps {
    onSelect: (balance: MyMoney) => void;
    balances: Record<string, MyMoney>;
}

export const SearchAsset: React.FC<SearchInputProps> = ({ balances, onSelect }) => {
    const [dropdownVisible, setDropdownVisible] = React.useState(false);
    const [currentBalances, setCurrentBalances] = React.useState<MyMoney[]>([]);
    const dropdownRef = React.useRef();
    const balancesList = React.useMemo(() => Object.values(balances).sort((a, b) => a.asset.hasImage ? -1 : 0), [balances]);

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value = e.target.value.trim();
        console.log('%c value', 'color: #e5b6ed', value);
        const newBalances = balancesList
            .filter(balance =>
                balance.asset.name.toLowerCase().includes(value.toLowerCase()) ||
                balance.asset.ticker?.toLowerCase().includes(value.toLowerCase()) ||
                balance.asset.id.toLowerCase().includes(value.toLowerCase()))

        setCurrentBalances(newBalances);
    }, [balancesList]);

    useEffect(() => {
        setCurrentBalances(balancesList);
    }, [balancesList]);

    const switchDropdown = (e: React.MouseEvent) => {
        e.preventDefault();
        setDropdownVisible(!dropdownVisible);
    }

    useClickOut(() => { setDropdownVisible(false) }, dropdownRef);

    return (
        <div className='search-asset-container' ref={dropdownRef}>
            <div className='search-input-wrapper'>
                <input
                    onChange={onChange}
                    className='search-input input'
                    type='text'
                    placeholder='Type asset name'/>
                <button className={`search-input-arrow ${dropdownVisible ? 'active' : ''}`} onClick={switchDropdown}/>
            </div>

            {dropdownVisible && <ul className='search-input-dropdown'>
                {currentBalances.map(balance => (
                    <li className='search-input-dropdown__item' key={balance.asset.id} onClick={() => onSelect(balance)}>
                        <div className='search-input-dropdown__meta-wrapper'>
                            <span className='search-input-dropdown__asset-icon' style={{ backgroundImage: `url('${balance.asset.icon}')` }} />
                            <span className='search-input-dropdown__asset-ticker'>{balance.asset.ticker || balance.asset.name}</span>
                            <span className='search-input-dropdown__asset-name'>{balance.asset.displayName}</span>
                        </div>
                        <div>
                            {balance.toFormat()}
                        </div>
                    </li>
                ))}
            </ul>}
        </div>
    );
}
