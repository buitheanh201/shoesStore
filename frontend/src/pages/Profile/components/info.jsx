import React from 'react';

function Info(props) {

    const { name, email, phoneNumber, address,errorName,errorPhoneNumber,
            getName,getPhoneNumber,getAddress } = props;

    
    return (
        <div className='w-1/2'>
            <div>
                <p className='font-medium pb-2'>Họ và tên</p>
                <input
                    onChange = {getName}
                    className=' border focus:bg-white focus:ring-2 h-12 outline-none px-2 rounded w-2/3'
                    defaultValue={name} type="text" />
                <p className = 'my-2 text-red-500 text-sm'>{errorName}</p>
            </div>
            <div>
                <p className='font-medium pb-2'>Email </p>
                <input
                    disabled={true}
                    className='bg-gray-100 border focus:bg-white focus:ring-2 h-12 outline-none px-2 rounded w-2/3'
                    defaultValue={email} type="text" />
            </div>
            <div>
                <p className='font-medium pb-2'>Số điện thoại</p>
                <input
                    onChange={getPhoneNumber}
                    className='border focus:bg-white focus:ring-2 h-12 outline-none px-2 rounded w-2/3'
                    type='text' defaultValue={phoneNumber} placeholder='Chưa cập nhật...' />
                 <p className = 'my-2 text-red-500 text-sm'>{errorPhoneNumber}</p>
            </div>
            <div>
                <p className='font-medium pb-2'>Địa chỉ</p>
                <input
                    onChange={getAddress}
                    className='border focus:bg-white focus:ring-2 h-12 outline-none px-2 rounded w-2/3'
                    type='text' value={address} placeholder='Chưa cập nhật....' />
            </div>
        </div>
    );
}

export default Info;