import * as React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

export interface ButtonProps {
    text: string
    to: string
    onClick?: any
}

export function Button(props: ButtonProps) {
    return (
        <Link to={props.to}>
            <button onClick={props.onClick} className='btn'>{props.text}</button>
        </Link>
    );
}
