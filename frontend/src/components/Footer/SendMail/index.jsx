import React from 'react';
import SendIcon from '@/assets/images/paper-plane.svg';

function SendMail() {
    return (
        <div className = 'w-1/4'>
            <div className = 'my-3 text-gray-700 text-xl'>Đăng kí nhận các trương trình khuyến mãi</div>
            <div className = 'mb-3 text-gray-500 text-sm'>
                Để lại email của bạn để nhận ngay những tin tức nóng hổi từ trương trình 
                của chúng tôi
            </div>
            <input className = 'focus:ring-2 focus:ring-yellow-500 h-10 outline-none px-2 rounded shadow text-sm w-full' type="text" placeholder = 'Nhập email của bạn....' />
            <button className = 'bg-yellow-600 flex h-8 hover:bg-yellow-500 hover:shadow justify-center leading-8 my-2 rounded text-sm text-white w-20'>
                <img className = 'h-3 mr-1 my-auto w-3' src= {SendIcon} alt="Email icon"/>Gửi
            </button>
        </div>
    );
}

export default SendMail;