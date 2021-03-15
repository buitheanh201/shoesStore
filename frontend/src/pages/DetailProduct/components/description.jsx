import React, { useEffect } from 'react';
import { $ } from '@/helpers/QuerySelector';

function Description(props) {

    const { description } = props;
    useEffect(() => {
        $('.content__description').innerHTML = description;
    }, [description])

    const onShowDesciprtion = (e) => {
        const content = $('.content__description');
        if(content.classList.contains('h-40')){
            content.classList.remove('h-40');
            $('.btn_show-description').children[0].innerHTML = 'Thu gọn';
        }else{
            content.classList.add('h-40');
            $('.btn_show-description').children[0].innerHTML = 'Xem thêm';
        }
    }

    return (
        <>
            <div className='bg-gray-100 mb-5 pl-3 py-4 text-xl text-gray-600 uppercase'>Mô tả sản phẩm</div>
            <div className='content__description h-40 overflow-hidden'></div>
            <div className = 'flex justify-center'>
                <button onClick = {onShowDesciprtion} className = 'btn_show-description bg-gradient-to-r flex from-blue-600 h-9 my-6 px-8 rounded text-sm text-white to-blue-400'>
                    <span className = 'my-auto'>Xem thêm</span>
                    <svg className = 'ml-1 my-auto w-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
        </>
    );
}

export default Description;