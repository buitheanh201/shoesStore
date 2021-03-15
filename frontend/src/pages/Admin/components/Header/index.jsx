import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '@/constants/Path';
import { useSelector } from 'react-redux';
import { $ } from '@/helpers/QuerySelector';

function Header() {
    const { data: account } = useSelector(state => state.authentication.account);

    const onOpenOption = () => $('.account_dropdown').classList.toggle('hidden');

    return (
        <div>
            <div className='flex h-16 justify-between px-8 rounded-xl shadow'>
                <div className='my-auto text-gray-600 text-xl'>
                    <svg className='text-gray-600 w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                </div>
                <div className="flex shadow relative px-2">
                    {account ?
                        <>
                            <div className='mx-2 my-auto' style={{ paddingRight: '0px' }}>
                                <img src={account.avatar} className='border-4 w-10 h-10 rounded-full' alt="profile" />
                            </div>
                            <div className='mx-3 my-auto'>
                                <p className='font-medium'>{account.name}</p>
                                <p className='text-gray-500 text-sm'>{account.email}</p>
                            </div>
                            <div className='cursor-pointer hover:text-yellow-800 mx-3 my-auto text-xl'>
                                <svg className='hover:text-black text-gray-500 w-7' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </div>
                            <div className='cursor-pointer hover:text-yellow-800 my-auto text-xl'>
                                <svg onClick = {onOpenOption} className='hover:text-black text-gray-500 w-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <ul className='absolute hidden account_dropdown bg-white px-2 px-6 mt-2 py-2 right-0 rounded shadow text-gray-700 top-full z-10'>
                                <li className='border-b cursor-pointer flex hover:border-black pb-2'>
                                    <svg className = 'mr-1 text-gray-500 w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <Link to={PATH.HOME}>Về trang chủ</Link>
                                </li>
                            </ul>
                        </>
                        : null
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;