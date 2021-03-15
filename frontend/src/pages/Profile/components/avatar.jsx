import React from 'react';

function Avatar(props) {

    const { avatar,onChangeAvatar } = props;

    const chageAvatar = (e) => {
        onChangeAvatar(e.target.files[0])
        const fileRender = new FileReader();
        fileRender.onload = (e) => {
            const avatar = document.querySelector('.avatar');
            avatar.src = e.target.result;
        }
        fileRender.readAsDataURL(e.target.files[0])
    }

    return (
        <div className='flex flex-col w-1/2'>
            <div className="flex justify-center">
                <img
                    className='avatar border-8 rounded-full w-56 h-56'
                    src={avatar} alt="avatar" />
            </div>
            <input onChange = {chageAvatar} hidden type="file" id = "file"/>
            <label htmlFor = "file" 
            className='cursor-pointer border text-center hover:bg-blue-500 hover:text-white mx-auto my-2 mt-6 py-3 rounded text-gray-500 w-1/4'>Chọn ảnh</label>
        </div>
    );
}

export default Avatar;