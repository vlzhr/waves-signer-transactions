import * as React from 'react';
import './Title.scss';

interface Title {
    priority?: '1' | '2' | '3' | '4';
}

export const Title: React.FC<Title> = ({ children, priority = 2 }) => {
    const TitleTag = `h${priority}`;

    return (
        <h1 className='title'>{children}</h1>
    );
}
