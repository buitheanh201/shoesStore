import React, { useRef, useState } from 'react';
import SearchIcon from '@/assets/images/loupe.png';
import ProductAPI from './../../../services/productApi';
import useFormat from './../../../hooks/useFormat';
import useSlug from './../../../hooks/useSlug';
import { Link } from 'react-router-dom';

function Search() {

    const debouce = useRef();
    const [result,setResult] = useState([]);
    const [isOpenSearch,setIsOpenSearch] = useState(false);

    const onSearch = (e) => {
        if(e.target.value === '') setIsOpenSearch(false);
        else setIsOpenSearch(true);
        if (debouce.current) clearTimeout(debouce.current);

        debouce.current = setTimeout(async () => {
            const { data } = await ProductAPI.findAll({ _q: e.target.value });
            setResult(data);
        }, 500)
    }

    return (
        <div className='flex my-auto relative'>
            <form className='relative'>
                <input onChange={onSearch} type="text" placeholder="Nhập nội dung tìm kiếm...."
                    className='search_input bg-gray-100 border focus:bg-white focus:border-yellow-500 h-10 outline-none px-5 rounded-full text-sm w-72' />
                <img src={SearchIcon} alt="Search icon" className='-translate-y-1/2 absolute right-2 top-1/2 transform' />
            </form>
            {isOpenSearch ? <div className='absolute bg-white px-2 py-3 rounded search_result shadow top-full w-full z-10'>
                {result.length > 0 ? result.map((item,key) => 
                <Link onClick = {e => {
                    setIsOpenSearch(false);
                    document.querySelector('.search_input').value = '';
                }} 
                to = {`/detail/${useSlug(item.name)}&${item._id}`} 
                key = {key} 
                className = 'my-2 border cursor-pointer flex hover:shadow rounded'>
                    <div className = 'w-1/3'>
                        <img
                            className='w-16'
                            src= {item.imageGallery[0].image} alt="Hình ảnh sản phẩm" />
                    </div>
                    <div className = 'my-auto w-2/3'>
                        <div className = 'font-medium overflow-ellipsis overflow-hidden whitespace-nowrap'>
                            {item.name}
                        </div>
                        <div className = 'flex'>
                            <p className = 'font-medium text-red-600'>{useFormat(item.price)} đ</p>
                            <p className = 'line-through mx-2 my-auto text-gray-500 text-sm'>{useFormat(item.oldPrice)} đ</p>
                        </div>
                    </div>
                </Link>) : <p>Không tìm thấy sản phẩm nào !</p>}
            </div> : null}
        </div>
    );
}

export default Search;