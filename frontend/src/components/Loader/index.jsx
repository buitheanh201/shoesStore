import React from 'react';
import './style.css';
function Loader({ style, contentLoading }) {
    return (
        <div style={style} className='bg-black bg-opacity-75 bottom-0 fixed flex flex-col left-0 right-0 top-0 w-full'>
            <div className = 'm-auto text-center text-white'>
                <div 
                    className="lds-dual-ring mx-auto">
                </div>
                <div className = 'my-4'>{contentLoading}</div>
            </div>
        </div>
    );
}

export default Loader;