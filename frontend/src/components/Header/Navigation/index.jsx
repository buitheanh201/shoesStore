import React from 'react';
import { NavLink } from 'react-router-dom';
import { PATH } from '@/constants/Path';
import './style.css';

function Nav() {
    return (
        <div className = 'flex px-10 text-gray-600'>
            <ul className = 'flex my-auto'>
                <li className = 'pr-5'>
                    <NavLink activeClassName = 'active_link' className = 'hover:text-yellow-600' exact = {true} to = {PATH.HOME}>Trang chủ</NavLink>
                </li>
                <li className = 'pr-5'>
                    <NavLink activeClassName = 'active_link' className = 'hover:text-yellow-600' to = {PATH.ABOUT}>Giới thiệu</NavLink>
                </li>
                <li className = 'pr-5'>
                    <NavLink activeClassName = 'active_link' className = 'hover:text-yellow-600' to = {PATH.SHOP}>Cửa hàng</NavLink>
                </li>
                <li className = 'pr-5'>
                    <NavLink activeClassName = 'active_link' className = 'hover:text-yellow-600' to = {PATH.NEWS}>Tin tức</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Nav;