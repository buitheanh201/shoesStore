import React from 'react';
import useFormat from '@/hooks/useFormat';
import { Link } from 'react-router-dom';
import useSlug from '@/hooks/useSlug';

function Table(props) {

    const { carts, onSelectItem,onChangeQuantity,onDelelte } = props;

    return (
        <>
            <div className='bg-white flex my-2 px-2 py-4 rounded text-base text-gray-600'>
                <div className='ml-3 cursor-pointer flex w-2/6'>
                    <label className='cursor-pointer'>Sản phẩm</label>
                </div>
                <div className='w-1/6'>Kích cỡ</div>
                <div className='w-1/6'>Đơn giá</div>
                <div className='w-1/6'>Số lượng</div>
                <div className='w-1/6'>Tổng tiền</div>
                <div className='w-28'>Thao tác</div>
            </div>
            {carts.map((item, key) => {
                return <div key={key} className='product_item bg-white flex my-2 px-2 py-4 rounded text-base text-gray-600'>
                    <div className='cursor-pointer flex w-2/6'>
                        <input onClick={(e) => onSelectItem(e, item)} className='cursor-pointer h-5 my-auto w-10'
                            type="checkbox" id="totalProduct" />
                        <img src={item.picture} className='w-20' alt="" />
                        <Link to={`/detail/${useSlug(item.name)}&${item.idProduct}`}
                            className='text-sm my-auto px-4 hover:text-yellow-600'>{item.name}
                        </Link>
                    </div>
                    <div className='w-1/6 my-auto'>{item.size}</div>
                    <div className='font-medium my-auto text-red-600 w-1/6'>{useFormat(item.price)}đ</div>
                    <div className='w-1/6 my-auto flex'>
                        <button
                        onClick = {e => onChangeQuantity(-1,item)}
                         className='border cursor-pointer h-8 hover:border-blue-500 text-center w-8'>-</button>
                        <div className='border h-8 leading-8 my-auto outline-none text-center w-10'>
                            {item.quantity}
                        </div>
                        <button
                        onClick = {e => onChangeQuantity(1,item)}
                        className='border cursor-pointer h-8 hover:border-blue-500 text-center w-8'>+</button>
                    </div>
                    <div className='font-medium my-auto text-red-600 w-1/6'>{useFormat(item.price * item.quantity)}đ</div>
                    <div className='w-28 my-auto'><button onClick = {() => onDelelte(item)} className='text-red-600'>Xóa</button></div>
                </div>
            })}
        </>
    );
}

export default Table;