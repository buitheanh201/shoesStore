import React from 'react';

function Comment(props) {
    return (
        <>
            <div className='bg-gray-100 mb-5 pl-3 py-4 text-xl text-gray-600 uppercase'>Bình luận sản phẩm</div>
            <div className = 'flex'>
                <div className = 'w-1/2'>

                </div>
                <div className = 'w-1/2'>
                    <div className='bg-blue-500 my-3 px-2 py-2 rounded text-sm text-white'>Viết bình luận</div>
                    <div>
                        <textarea className='bg-gray-100 block border focus:bg-white h-20 px-2 py-2 resize-none rounded w-full'
                            placeholder='Nhập nội dung bình luận'>

                        </textarea>
                    </div>
                    <div>
                        <button className = 'bg-blue-500 flex h-9 justify-center my-3 rounded text-white w-28'>
                            <svg className = 'mr-1 my-auto w-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                            <span className = 'my-auto'>Gửi</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Comment;