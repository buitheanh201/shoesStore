import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '@/constants/Path';
import HomeIcon from '@/assets/images/home.svg';
import HotlineIcon from '@/assets/images/hotline.svg';
import NewsIcon from '@/assets/images/newspaper.svg';
import ShopIcon from '@/assets/images/shop.svg';
import AboutIcon from '@/assets/images/about.svg'

function Page() {
    return (
        <div className = 'w-1/4 px-6'>
            <div className = 'my-3 text-gray-700 text-xl'>BTA Shop</div>
            <div>
                <Link className = 'flex hover:text-blue-600 mb-4 text-gray-700' to = {PATH.HOME}>
                    <img className = 'h-4 mr-2 my-auto w-4' src= {HomeIcon} alt="Home Icon"/>Trang chủ</Link>
                <Link className = 'flex hover:text-blue-600 mb-4 text-gray-700' to = {PATH.ABOUT}>
                    <img className = 'h-4 mr-2 my-auto w-4' src= {AboutIcon} alt="Home Icon"/>Giới thiệu</Link>
                <Link className = 'flex hover:text-blue-600 mb-4 text-gray-700' to = {PATH.SHOP}>
                    <img className = 'h-4 mr-2 my-auto w-4' src= {ShopIcon} alt="Home Icon"/>Cửa hàng</Link>
                <Link className = 'flex hover:text-blue-600 mb-4 text-gray-700' to = {PATH.NEWS}>
                    <img className = 'h-4 mr-2 my-auto w-4' src= {NewsIcon} alt="Home Icon"/>Tin tức</Link>
                <Link className = 'flex hover:text-blue-600 mb-4 text-gray-700' to = {PATH.CONTACT}>
                    <img className = 'h-4 mr-2 my-auto w-4' src= {HotlineIcon} alt="Home Icon"/>Liên Hệ</Link>
            </div>
        </div>
    );
}

export default Page;