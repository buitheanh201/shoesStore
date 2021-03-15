import React from 'react';

function Input({title,svgImage,onChange,errClass,name,type}) {
    return (
        <div className='mb-4'>
            <p className='font-medium mb-4 text-gray-600'>{title}</p>
            <div className='border-b flex focus-within:border-gray-700 pb-2'>
                {svgImage}
                <input
                    onChange = {onChange}
                    className= {`outline-none w-full ${name}`}
                    type= {type}
                    placeholder = {`${title}......`}
                />
            </div>
        <div className = {`my-2 text-red-500 text-sm ${errClass}`}></div>
        </div>
    );
}

export default Input;