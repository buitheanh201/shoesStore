import React from 'react';

function Header() {
    return (
        <div className='bg-white px-3 py-3 rounded text-gray-800 text-sm'>
            <span className='mr-2'>BTA Shop</span>/<span className='mx-2 text-yellow-700'>Giỏ hàng của bạn</span>
        </div>
    );
}

export default Header;