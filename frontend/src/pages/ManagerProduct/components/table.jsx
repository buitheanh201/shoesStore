import React from 'react';
import useFormat from './../../../hooks/useFormat';
import { Link } from 'react-router-dom';

function Table(props) {

    const { products,onDelete } = props;

    return (
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
                <tr className="border-b">
                    <th className="text-left p-3 px-5">STT</th>
                    <th className="text-left p-3 px-5">Tên sản phẩm</th>
                    <th className="text-left p-3 px-5">Giá sản phẩm</th>
                    <th className="text-left p-3 px-5">Hình ảnh</th>
                    <th className="text-left p-3 px-5">Tồn kho</th>
                    <th className="text-left p-3 px-5">Action</th>
                </tr>
                {products.map((item, key) => {
                    return <tr key={key} className="border-b hover:bg-orange-100 bg-gray-100">
                        <td className="p-3 px-5">{key + 1}</td>
                        <td className="p-3 px-5">{item.name}</td>
                        <td className="font-medium p-3 px-5 text-red-600">{useFormat(item.price)}đ</td>
                        <td className="p-3 px-5"><img className='w-16' src={item.imageGallery[0].image} alt="hình ảnh sản phẩm" /></td>
                        <td className="p-3 px-5">{item.sizes.reduce((init,item,key) => init + item.inventory,0)}</td>
                        <td className="p-3 px-5 flex justify-start my-auto">
                            <div>
                                <Link to = {`/admin/products/edit/${item._id}`} type="button" className="mb-1 justify-center flex bg-yellow-500 focus:outline-none h-8 hover:bg-yellow-600 mr-3 px-2 py-1 rounded text-sm text-white w-20">
                                    <svg className='my-auto w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                    </svg>
                                    <span className='my-auto'>Sửa</span>
                                </Link>
                                <button onClick = {(e) => onDelete(item)} type="button" className="justify-center flex text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 w-20 rounded focus:outline-none">
                                    <svg className='my-auto w-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    <span className='my-auto'>Xóa</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    );
}

export default Table;