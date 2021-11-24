import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from '../Dropdown';
import { Button } from '../Button';
import styled from 'styled-components'
import tw from "twin.macro";
import { RootStateOrAny, useSelector } from "react-redux";
import { useAppDispatch } from '../../app/hooks'
import { authActions } from '../../redux/userSlice'

const TagNav = styled.nav`

    height: 80px;
    font-size: 1.2rem;

    ${tw`
    w-full
    bg-black
    flex
    justify-center
    items-center
    `}

    & > a {
        color: #fff;
        justify-self: start;
        margin-left: 20px;
        cursor: pointer;
        text-decoration: none;
        font-size: 2rem;
    }

    button {
        
    }

    @media screen and (max-width: 960px) {
        button{
            display: none;
        }

        & > a{
            position: absolute;
            top: 0;
            left: 0;
            transform: translate(25%, 40%);
        }
    }

`

const MenuIcon = styled.div`
    ${tw`

    `};

    display: none;

    & > .fa-bars {
        color: #fff;
    }

    @media screen and (max-width: 960px) {
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(-100%, 50%);
            font-size: 1.8rem;
            cursor: pointer;

        .fa-times {
            color: #fff;
            font-size: 2rem;
          }
    }

`

const TagUl = styled.ul`

    ${tw`
    grid
    `}
    grid-template-columns: repeat(5, auto);
    grid-gap: 10px;
    list-style: none;
    text-align: center;
    width: 70vw;
    justify-content: end;
    margin-right: 2rem;

    & > .nav-item {
        display: flex;
        align-items: center;
        height: 80px;

        & > .nav-links {
            color: white;
            text-decoration: none;
            padding: 0.5rem 1rem;
          }
        & > .nav-links:hover {
            background-color: #1888ff;
            border-radius: 4px;
            transition: all 0.2s ease-out;
        }
      }
    
    .nav-links-mobile {
        display: none;
    }

    @media screen and (max-width: 960px) {
    
        
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 90vh;
        position: absolute;
        top: 80px;
        left: -100%;
        opacity: 1;
        transition: all 0.5s ease;
        

        &.active {
            background: #242222;
            left: 0;
            opacity: 1;
            transition: all 0.5s ease;
            z-index: 1;
        }

        & > li > a.nav-links {
            text-align: center;
            padding: 2rem;
            width: 100%;
            display: table;
        }

        & > li > a.nav-links:hover {
            background-color: #1888ff;
            border-radius: 0;
          }
        
        & > li > a.nav-links-mobile {
            display: block;
            text-align: center;
            padding: 1.5rem;
            margin: 2rem auto;
            border-radius: 4px;
            width: 80%;
            background: #1888ff;
            text-decoration: none;
            color: #fff;
            font-size: 1.5rem;
          }
        
        & > li > a.nav-links-mobile:hover {
            background: #fff;
            color: #1888ff;
            transition: 250ms;
        }
    }

`

export interface NavBarProps {
}

export function NavBar(props: NavBarProps) {

    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const state = useSelector((state: RootStateOrAny) => state.user.user);
    const dispatch = useAppDispatch();

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(!click);

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(true);
        } else {
            setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };

    return (
        <>
            <TagNav>
                <Link to='/' onClick={closeMobileMenu}>
                    TodoList
                    {/* gọi 1 funtion */}
                </Link>
                <MenuIcon className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    {/* toán tử 3 ngôi kiểm tra menu-toogle */}
                </MenuIcon>
                <TagUl className={click ? 'active' : ''}>
                    {/*  */}
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li
                        className='nav-item'
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        <a
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                            Services <i className='fas fa-caret-down' />
                        </a>
                        {dropdown && <Dropdown />}
                    </li>
                    <li className='nav-item'>
                        <Link
                            to='/products'
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                            Products
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link
                            to='/contact-us'
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                            Contact Us
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/SignIn'
                            className='nav-links-mobile'
                            onClick={closeMobileMenu}
                        >
                            Sign In
                        </Link>
                    </li>
                </TagUl>
                {state ? (<Button to="/" text="Log out" onClick={() => {
                    dispatch(authActions.logout());
                }} />) : (<Button text="SignIn" to="SignIn" />)}

            </TagNav>
        </>
    );
}
