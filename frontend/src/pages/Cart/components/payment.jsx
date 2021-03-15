import React from 'react';
import useFormat from '@/hooks/useFormat';

function Payment(props) {
    const { itemSelected,onSelectedAll,carts,onDeleteAll,onCheckout } = props;
    return (
        <div className='bg-white flex justify-between px-2 py-7'>
            <div className = 'flex'>
                <input onClick = {onSelectedAll} className='cursor-pointer h-5 my-auto w-10'
                    id="totalProducts" type="checkbox" />
                <label className = 'cursor-pointer my-auto' htmlFor="totalProducts">
                    Chọn tất cả ({carts.length})
                </label>
            </div>
            <div className = 'my-auto'><button onClick = {onDeleteAll} className = 'hover:text-red-600 focus:outline-none'>Xóa</button></div>
            <div className = 'my-auto'>Tổng tiền hàng ( {itemSelected.length} Sản phẩm) :
             <span className = 'font-medium mx-3 text-2xl text-red-600'>
                {useFormat(itemSelected.reduce((init,item) => item.price * item.quantity + init,0))
             } đ</span></div>
            <div><button onClick = {onCheckout} className = 'bg-yellow-600 px-10 py-3 rounded text-white'>Mua hàng</button></div>
        </div>
    );
}

export default Payment;