import React, { useState } from 'react';
import { MenuItems } from './MenuItems';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import tw from 'twin.macro'

export interface DropdownProps {
}

const TagUl = styled.ul`
  
    // background: red;
    width: 200px;
    position: absolute;
    top: 80px;
    list-style: none;
    text-align: start;
    

    & > li {
        background: #1888ff;
        cursor: pointer;
    }

    & > .clicked {
        display: none;
    }

    & > li > a.dropdown-link {
        display: block;
        height: 100%;
        width: 100%;
        text-decoration: none;
        color: #fff;
        padding: 16px;
    }

`

export function Dropdown(props: DropdownProps) {

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <>
            <TagUl
                onClick={handleClick}
                className={click ? 'clicked' : ''}
            >
                {MenuItems.map((item: any, index) => {
                    return (
                        <li key={index}>
                            <Link
                                className={item.cName}
                                to={item.path}
                                onClick={() => setClick(false)}
                            >
                                {item.title}
                            </Link>
                        </li>
                    );
                })}
            </TagUl>
        </>
    );
}
