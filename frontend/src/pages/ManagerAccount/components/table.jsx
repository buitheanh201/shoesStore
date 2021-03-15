import React from 'react';
import { useSelector } from 'react-redux';

function Table(props) {

    const { accounts } = props;
    const _id = useSelector(state => state.authentication.account?.data?._id);

    return (
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
                <tr className="border-b">
                    <th className="text-left p-3 px-5">STT</th>
                    <th className="text-left p-3 px-5">Họ và tên</th>
                    <th className="text-left p-3 px-5">Email</th>
                    <th className="text-left p-3 px-5">Số điện thoại</th>
                    <th className="text-left p-3 px-5">Quyền</th>
                    <th className="text-left p-3 px-5">Địa chỉ</th>
                    <th className="text-left p-3 px-5">Action</th>
                </tr>
                {accounts.map((item, key) =>
                    <tr key = {key} className="border-b hover:bg-orange-100 bg-gray-100">
                        <td className="p-3 px-5">{key + 1}</td>
                        <td className="p-3 px-5">{item.name} {item._id === _id ? <b>(You)</b> : ''}</td>
                        <td className="p-3 px-5">{item.email}</td>
                        <td className="p-3 px-5">{item.phoneNumber === '' ? 'Chưa cập nhật...' : item.phoneNumber}</td>
                        <td className="p-3 px-5">
                            <select 
                             onChange = {e => {}}  
                             className = 'cursor-pointer font-medium px-3 py-2 rounded text-sm'
                             disabled = {item._id === _id ? true : false} value = {item.permission} >
                                <option value="1">Người dùng</option>
                                <option value="2">Nhân viên</option>
                                <option value="3">Quản trị</option>
                            </select>
                        </td>
                        <td className="p-3 px-5">{item.address === '' ? 'Chưa cập nhật...' : item.address}</td>
                        <td className="p-3 px-5 flex justify-start my-auto">
                            <div>
                                <button onClick={(e) => onDelete(item)} type="button" 
                                className="justify-center flex text-sm bg-blue-500 hover:bg-red-700 text-white py-1 px-2 w-20 rounded focus:outline-none">
                                    <span className='my-auto'>loading...</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default Table;