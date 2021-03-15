import React from 'react';
import Account from './Account';
import Search from './Search';
import Navigation from './Navigation';
import Logo from './Logo';

function Header() {
    return (
        <header className = 'border-b border-gray-100 box-border flex h-16 justify-between px-10'>
            <div className = 'flex my-auto'>
                <Logo />
                <Navigation />
            </div>
            <div className = 'flex my-auto relative'>
                <Search />
                <Account />
            </div>
        </header>
    );
}

export default Header;