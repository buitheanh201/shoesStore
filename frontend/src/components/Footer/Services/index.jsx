import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '@/constants/Path';
import UserIcon from '@/assets/images/user (1).svg';
import HeartIcon from '@/assets/images/heart.svg';

function Service() {
    return (
        <div className = 'w-1/4 px-6'>
            <div className = 'my-3 text-gray-700 text-xl'>Dịch vụ khách hàng</div>
            <div>
                <Link className = 'flex hover:text-blue-600 mb-4 text-gray-700' to = {PATH.PROFILE}>
                    <img className = 'h-4 mr-2 my-auto w-4' src= {UserIcon} alt="Icon user"/> Tài khoản của tôi
                </Link>
                <Link className = 'flex hover:text-blue-600 mb-4 text-gray-700' to = {PATH.FAVOURITE}>
                    <img className = 'h-4 mr-2 my-auto w-4' src= {HeartIcon} alt="Icon Heart"/>Yêu thích của tôi
                </Link>
            </div>
        </div>
    );
}

export default Service;