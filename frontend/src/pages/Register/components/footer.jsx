import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '@/constants/Path';
function Footer() {
    return (
        <div>
            <div className='my-8 text-center text-gray-500'>___________Hoặc__________</div>
            <div className='text-center text-gray-600'>
                Đã có tài khoản vui lòng <Link className='text-blue-700 underline' to={PATH.LOGIN}>đăng nhập</Link>
            </div>
        </div>
    );
}

export default Footer;