import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function ProductItem({ link, name, price, oldPrice, image }) {
    return (
        <div className='hover:shadow productItem mb-3'>
            <div>
                <img src={image} alt="Hình ảnh minh họa sản phẩm" />
            </div>
            <div>
                <div className='font-medium py-2 text-gray-500 text-sm uppercase'>Giày thể thao</div>
                <div>
                    <Link to={link} className='hover:text-yellow-600 block font-medium pb-2 text-gray-800 text-lg'>{name}</Link>
                </div>
                <div>
                    <span className='font-bold mr-3 text-red-600'>{price}</span>
                    <span className='line-through mr-3 text-gray-400'>{oldPrice}</span>
                </div>
                <div className='pt-3'>
                    <div>
                        <Link to={link} className='bg-blue-500 block h-8 leading-8 mr-2 rounded text-center text-sm text-white w-32'>Chi tiết</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;