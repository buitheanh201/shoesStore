import React from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';
import { PATH } from '@/constants/Path';

function Navbar() {
    return (
        <div style={{ height: '100vh' }} className="admin__sidebar shadow w-1/5">
            <div style={{ margin: 'auto 0px' }} className="border border-b logo logoForAdmin">
                <div>B</div>
                <div>T</div>
                <div>A</div>
                <div>S</div>
                <div>H</div>
                <div>O</div>
                <div>P</div>
            </div>
            <ul>
                <li>
                    <NavLink exact activeClassName="activeSelected" to={PATH.MANAGER} >
                        <svg className='inline-block mr-2 w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                        </svg>
                        <div className='inline-block transform translate-y-0.5'>Dashboard</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="activeSelected" to={PATH.MANAGER_USER} >
                        <svg className='inline-block mr-2 w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                        </svg>
                        <div className='inline-block transform translate-y-0.5'>Quản lí người dùng</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="activeSelected" to={PATH.MANAGER_PRODUCT} >
                        <svg className='inline-block mr-2 w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                        </svg>
                        <div className='inline-block transform translate-y-0.5'>Quản lí sản phẩm</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="activeSelected" to={PATH.MANAGER_CATEGORY} >
                        <svg className='inline-block mr-2 w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                        </svg>
                        <div className='inline-block transform translate-y-0.5'>Quản lí danh mục</div>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;