import React from 'react';

function Button({title,onClick}) {
    return (
        <div className='mt-10'>
            <button onClick = {onClick} className='bg-gradient-to-r from-purple-700 h-10 rounded text-white to-yellow-400 via-pink-600 w-full'>
                {title}
            </button>
        </div>
    );
}

export default Button;