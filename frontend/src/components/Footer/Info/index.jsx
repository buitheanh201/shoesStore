import React from 'react';
import LogoWebsite from '@/assets/images/logo.png';
import { Link } from 'react-router-dom';
import { PATH } from '@/constants/Path';

function Info() {
    return (
        <div className = 'w-1/4'>
            <div className = 'border-b border-gray-400 border-opacity-20 pb-3'>
                <Link to={PATH.HOME}><img className='w-28' src={LogoWebsite} alt="Logo website" /></Link>
            </div>
            <div>
                <p className = 'my-1 text-gray-700'>Hotline : </p>
                <p className = 'font-medium text-gray-700'>0382995130</p>
            </div>
            <div>
                <p className = 'my-1 text-gray-700' >Địa chỉ : </p>
                <p className = 'my-1 text-gray-700 text-sm'>225 Quan Hoa, Cầu Giấy, Hà Nội</p>
            </div>
            <div>
                <p className = 'my-1 text-gray-700'>Email : </p>
                <p className = 'my-1 text-gray-700 text-sm'>bupbui95@gmail.com</p>
                <p className = 'my-1 text-gray-700 text-sm'>anhbtph12413@gmail.com</p>
            </div>
            <div className = 'mt-4 text-gray-700 text-sm'>
              © 2021 BTA Shop thiết kế và lập trình bởi Bùi Thế Anh
            </div>
        </div>
    );
}

export default Info;