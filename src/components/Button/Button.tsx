import * as React from 'react';
import './Button.scss';

interface Button {
    variant: 'transparent' | 'primary';
    onClick: () => void;
}

export const Button: React.FC<Button> = ({ children, variant, ...rest }) => (
    <button className={`btn btn_variant`} {...rest}>Log Out</button>
);
