import React, { useEffect, useState } from 'react';
import { $ } from '@/helpers/QuerySelector';
import useFormat from '@/hooks/useFormat';
import { addToCart } from './../../../actions/auth'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getStorage,setStorage } from './../../../helpers/Storage';
import { v4 as uuid } from 'uuid';

function Info(props) {

    const { sizes, name, price, oldPrice, comments, views,picture,idProduct } = props;
    const [currentSize, setCurrentSize] = useState(sizes[0]);
    const account = useSelector(state => state.authentication.account.data);
    const [quantity,setQuantity] = useState(1);
    const dispatch = useDispatch();
    const [redirect,setRedirect] = useState(false);
    useEffect(() => {
        setCurrentSize(sizes[0]);
    },[sizes]);

    const handleQuantity = (size) => {
        if(size < 0){
            if(quantity <= 1) return setQuantity(1)
            return setQuantity(quantity - 1)
        }else {
            if(quantity >= currentSize.inventory) return setQuantity(1)
            return setQuantity(quantity + 1);
        }
    }

    const onAddToCart = () => {
        const getProductForGuest = getStorage('products')
        const product = {
            _id : uuid(),
            size :currentSize.size,
            quantity,idProduct
        }
        if(getProductForGuest){
            const existProduct = getProductForGuest.filter(item => item.idProduct === product.idProduct 
                                                            && item.size === product.size);
            if(existProduct.length > 0){
                const newProduct = getProductForGuest.map(item => {
                    if(item.size === product.size){
                        return {...item,quantity : item.quantity += product.quantity}
                    }
                    return item;
                })
                setStorage('products',newProduct)
            }else {
                getProductForGuest.push(product);
                setStorage('products',getProductForGuest);
            }
        }else setStorage('products',[product]);
        $('.totalProduct').innerHTML = getProductForGuest ? getProductForGuest.length : 1;
       }
    if(redirect) return <Redirect to = '/login' />
    return (
        <div>
            <div>
                <p className='font-medium py-5 text-2xl'>{name}</p>
                <div className='flex'>
                    <div className='border-r flex px-3 text-gray-600 text-sm'>
                        <svg className='mr-2 my-auto text-green-600 w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <div className='my-auto'> Hàng chính hãng</div>
                    </div>
                    <div className='border-r my-auto px-3 text-gray-600 text-sm'>
                        {comments} Bình luận
                   </div>
                    <div className='border-r flex px-3 text-gray-600 text-sm'>
                        <div>{views}</div>
                        <svg className='ml-2 w-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div>
                <div className='bg-gray-100 bg-opacity-50 mr-4 my-3 pl-2 py-7 rounded text-3xl'>
                    <span className='font-medium mr-4 text-red-600'>{useFormat(price)} ₫</span>
                    <span className='line-through text-gray-500 text-xl'>{useFormat(oldPrice)} ₫</span>
                    <span className = 'bg-red-600 font-medium mx-4 p-1 rounded text-sm text-white uppercase'>
                        {Math.ceil(100 - (price / oldPrice * 100))}% Giảm
                    </span>
                </div>
                <ul>
                    <li className='flex mb-4'>
                        <span className='font-medium text-gray-600 w-1/4'>Tình trạng</span>
                        <span className='text-sm'> Hàng mới 100%</span>
                    </li>
                    <li className='flex mb-4'>
                        <span className='font-medium text-gray-600 w-1/4'>Giao hàng</span>
                        <span className='text-sm'>Giao hàng trên toàn quốc và thanh toán khi nhận hàng</span>
                    </li>
                </ul>
                <div>
                    <div className='flex mt-8 my-4'>
                        <label className='font-medium text-gray-600 w-1/4'>Kích cỡ</label>
                        <div className='flex flex-wrap w-2/4'>
                            {sizes.map((item, key) => {
                                if (item._id === currentSize._id) {
                                    return <div
                                        onClick={() => setCurrentSize(item)}
                                        className='border-blue-400 checked_size border cursor-pointer h-8 hover:border-blue-500 hover:text-blue-500 leading-8 mb-2 mr-3 rounded text-center text-gray-600 w-20'
                                        key={key}>{item.size}
                                    </div>
                                }
                                return <div
                                    onClick={() => {
                                        if(quantity !==  1) setQuantity(1)
                                        setCurrentSize(item)
                                    }}
                                    className='border cursor-pointer h-8 hover:border-blue-500 hover:text-blue-500 leading-8 mb-2 mr-3 rounded text-center text-gray-600 w-20'
                                    key={key}>{item.size}
                                </div>
                            }
                            )}
                        </div>
                    </div>
                    <div className='flex'>
                        <label className='font-medium text-gray-600 w-1/4'>Số lượng</label>
                        <div className='flex'>
                            <div className='flex mr-4 text-gray-700'>
                                <div onClick = {() => handleQuantity(-1)} className='border cursor-pointer h-8 hover:border-blue-500 text-center w-8'>-</div>
                                <input onChange = {() => {}} value={quantity} className='border outline-none text-center w-16' type="text" />
                                <div onClick = {() => handleQuantity(1)} className='border cursor-pointer h-8 hover:border-blue-500 text-center w-8'>+</div>
                            </div>
                            <div className='text-base text-gray-700'>
                                <span className='font-medium px-2'>{currentSize.inventory}</span>
                                <span>Sản phẩm có sẵn</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex my-10'>
                    <button
                        onClick = {onAddToCart}
                        className='border border-blue-500 flex h-14 my-auto px-8 rounded text-blue-600'
                        style={{ background: 'rgb(34 150 255 / 15%)' }}>
                        <svg className='mr-2 my-auto w-5'
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className='my-auto'>Thêm vào giỏ hàng</span>
                    </button>
                    <button
                        className='bg-blue-500 border-yellow-600 flex h-14 mx-3 px-8 rounded text-white'>
                        <span className='my-auto '>Mua Ngay</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Info;