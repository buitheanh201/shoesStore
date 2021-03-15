import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { PATH } from '@/constants/Path';
import { $ } from '@/helpers/QuerySelector';
import { logout } from '@/actions/auth';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { getStorage } from './../../../helpers/Storage';

function Account() {
    const dispatch = useDispatch();
    const account = useSelector(state => state.authentication.account);
    const [productLocal,setProductLocal] = useState([]);
    const onToggle = () => {
        $('.account_dropdown').classList.toggle('hidden');
    }
    useEffect(() =>{
        if(getStorage('products')){
            setProductLocal(getStorage('products'))
        }else setProductLocal([]);
    },[account]);
    document.addEventListener('click', (e) => {
        if ($('.account_icon')) {
            if (!e.target.closest('.account_icon')) {
                if (!$('.account_dropdown').classList.contains('hidden')) {
                    $('.account_dropdown').classList.toggle('hidden', true);
                }
            }
        }
    });
    const onLogout = () => {
        dispatch(logout());
    }
    return (
        <div className='flex my-auto'>
            <Link to={PATH.CART} className='my-auto px-7 pr-4 relative'>
                <svg className='hover:text-black text-gray-500 w-8' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <div className='-bottom-2 totalProduct absolute bg-yellow-500 font-medium h-4 leading-4 right-3 rounded-full text-center text-white text-xs w-4'>
                    {account?.data?.carts?.length || productLocal.length}
                </div>
            </Link>
            <div>
                {account.data ?
                    <div className='flex'>
                        <div className='pr-4 my-auto relative'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='-bottom-0 cursor-pointer hover:text-black text-gray-500 w-8'>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <div className='-bottom-2 absolute bg-yellow-500 font-medium h-4 leading-4 right-3 rounded-full text-center text-white text-xs w-4'>0</div>
                        </div>
                        <div>
                            <img onClick={onToggle} src={account.data.avatar} className='account_icon border-4 cursor-pointer h-8 hover:border-purple-300 rounded-full w-8' alt="image user" />
                            <ul className='absolute hidden account_dropdown bg-white mt-3 px-2 py-2 right-0 rounded shadow text-gray-700 top-full w-1/3 z-10'>
                                <li className='border-b cursor-pointer hover:text-yellow-600 pb-2'>
                                    <Link to={PATH.PROFILE} className='flex'>
                                        <svg className='mr-2 w-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Trang cá nhân
                                    </Link>
                                </li>
                                {account.data.permission === "3" ?
                                    <li className='border-b cursor-pointer hover:text-yellow-600 pt-2 pb-2'>
                                        <Link to={PATH.MANAGER} className='flex'>
                                            <svg className='mr-2 w-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                    Quản trị viên
                                    </Link> </li> : null}
                                <li className='border-b cursor-pointer hover:text-yellow-600 pt-2 pb-2'>
                                    <div onClick={onLogout} className='flex'>
                                        <svg className='mr-2 w-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Đăng xuất
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div> :
                    <>
                        <svg className='account_icon cursor-pointer hover:text-black text-gray-500 w-8' onClick={onToggle} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <ul className='absolute hidden account_dropdown bg-white mt-3 px-2 py-2 right-0 rounded shadow text-gray-700 top-full w-1/3 z-10'>
                            <li className='border-b cursor-pointer hover:text-yellow-600 pb-2'>
                                <Link to={PATH.LOGIN}>Đăng nhập</Link>
                            </li>
                            <li className='border-b cursor-pointer hover:text-yellow-600 pb-2'>
                                <Link to={PATH.REGISTER}>Đăng kí</Link>
                            </li>
                        </ul>
                    </>
                }
            </div>
        </div>
    );
}

export default Account;