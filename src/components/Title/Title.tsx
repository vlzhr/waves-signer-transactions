import * as React from 'react';
import './Title.scss';

interface Title {
    priority?: '1' | '2' | '3' | '4';
    className?: string;
}

export const Title: React.FC<Title> = ({ children, priority = 2, className }) => {
    const TitleTag = `h${priority}`;

    return (
        <h2 className={`title ${className}`}>{children}</h2>
    );
}
