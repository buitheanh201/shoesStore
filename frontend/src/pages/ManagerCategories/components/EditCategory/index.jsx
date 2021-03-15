import React, { useState,useEffect } from 'react';
import CategoryAPI from '@/services/categoryApi';
import { Redirect } from 'react-router-dom';
import Loader from './../../../../components/Loader';

function EditCategory(props) {
    const { id } = props.match.params;
    const [name, setName] = useState('');
    const [file, setFile] = useState('');
    const [category,setCategory] = useState({});
    const [redirect,setRedirect] = useState(false);
    const [loaderConfig,setLoaderConfig] = useState({content : '',display : 'none'})
    useEffect(() => {
        window.scrollTo(0,0);
        const fetchAll = async() => {
            const { data : category } = await CategoryAPI.findOne(id);
            setCategory(category);
            setName(category.categoryName);
        }
        fetchAll()
    },[])

    const onSubmit = async () => {
        setLoaderConfig({...loaderConfig,content : 'Đang cập nhật...',display : 'flex'})
        const form = new FormData();
        if(file !== ''){
            form.append('categoryImage', file); 
        }
        form.append('name', name)
        const data = await CategoryAPI.update(id,form);
        setLoaderConfig({...loaderConfig,content : 'Cập nhật thành công ,đang chuyển hướng ! ',display : 'flex'});
        setTimeout(() => {
            setRedirect(true)
        },1000);
    }
    if(redirect) return <Redirect to = '/admin/categories' />
    return (
        <div className='p-3'>
            <Loader
                contentLoading = {loaderConfig.content}
                style = {{display : loaderConfig.display}} 
            />
            <div>
                <p className='font-medium my-2'>Tên danh mục</p>
                <input className = 'price bg-gray-100 border focus:bg-white h-10 px-2 rounded w-full'
                defaultValue = {category.categoryName} 
                onChange={e => setName(e.target.value)} type="text" placeholder='Tên danh mục' />
                <p className='font-medium my-2'>Hình ảnh </p>
                <input className = 'rounded bg-gray-100 border py-2 w-full' onChange={e => setFile(e.target.files[0])} type="file" placeholder='hình ảnh ' />
                <img className='w-24 my-3' src={category.categoryImage?.avatar} alt="Hình ảnh sản phẩm" />
                <div>
                    <button className = 'bg-blue-500 block h-10 my-4 rounded text-white w-40' onClick={onSubmit}>Cập nhật danh mục</button>
                </div>
            </div>
        </div>
    );
}

export default EditCategory;