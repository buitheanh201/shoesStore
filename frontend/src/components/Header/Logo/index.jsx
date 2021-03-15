import React from 'react';
import LogoWebsite from '@/assets/images/logo.png';
import { Link } from 'react-router-dom';
import { PATH } from '@/constants/Path';

function Logo() {
    return (
        <div>
           <Link to = {PATH.HOME}><img className = 'w-28' src = {LogoWebsite} alt="Logo website" /></Link>
        </div>
    );
}

export default Logo;