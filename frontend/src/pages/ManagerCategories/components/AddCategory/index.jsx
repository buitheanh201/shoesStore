import React, { useState } from 'react';
import CategoryAPI from '@/services/categoryApi';
import Loader from '@/components/Loader';
import { Redirect } from 'react-router-dom';

function AddCategory() {

    const [name, setName] = useState('');
    const [file, setFile] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [loaderConfig, setLoaderConfig] = useState({ content: '', display: 'none' })

    const onSubmit = async () => {
        setLoaderConfig({ ...loaderConfig, content: 'Đang thêm danh mục...', display: 'flex' })
        const form = new FormData();
        form.append('categoryImage', file);
        form.append('name', name)
        const data = await CategoryAPI.create(form);
        setLoaderConfig({ ...loaderConfig, content: 'Thêm thành công ,đang chuyển hướng ! ', display: 'flex' });
        setTimeout(() => {
            setRedirect(true)
        }, 1000);
    }
    if(redirect) return <Redirect to = '/admin/categories' />
    return (
        <div className='p-3'>
            <Loader
                contentLoading={loaderConfig.content}
                style={{ display: loaderConfig.display }}
            />
            <div>
                <p className='font-medium my-2'>Tên danh mục</p>
                <input className='price bg-gray-100 border focus:bg-white h-10 px-2 rounded w-full' onChange={e => setName(e.target.value)} type="text" placeholder='Tên danh mục' />
                <p className='font-medium my-2'>Hình ảnh </p>
                <input className='rounded bg-gray-100 border py-2 w-full' onChange={e => setFile(e.target.files[0])} type="file" placeholder='hình ảnh ' />
                <div>
                    <button className='bg-blue-500 block h-10 my-4 rounded text-white w-40' onClick={onSubmit}>Thêm danh mục</button>
                </div>
            </div>
        </div>
    );
}

export default AddCategory;