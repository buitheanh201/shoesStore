import React from 'react';

function Header({title}) {
    return (
    <div className = 'py-7 text-gray-600 text-sm'>
        <span className = 'mr-2'>BTA Shop</span>/
        <span className = 'mx-2'>Chi tiết sản phẩm</span>/
        <span className = 'mx-2 text-blue-500'>{title}</span>
    </div>
    );
}

export default Header;