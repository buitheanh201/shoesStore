import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '@/constants/Path';
import Table from './components/table';
import CategoryAPI from './../../services/categoryApi';
import Loader from './../../components/Loader';

function Category() {

    const [categories,setCategories] = useState([]);
    const [loaderConfig, setLoaderConfig] = useState({ content: '', display: 'none' })

    useEffect(() => {
        const fetchAll = async() => {
            const { data : categories} = await CategoryAPI.findAll();
            setCategories(categories);
        }
        fetchAll();
    },[]);

    const onDelete = async(item) => {
        const isDelete = confirm('Xác nhận xóa sản phẩm ?');
        if (isDelete) {
            try {
                setLoaderConfig({ ...loaderConfig, display: 'flex', content: 'Đang xóa sản phẩm...' })
                const res = await CategoryAPI.delete(item._id, item.folderID);
                const reRender = categories.filter(category => item._id !== category._id);
                setCategories(reRender);
                setLoaderConfig({ ...loaderConfig, content: 'Xóa sản phẩm thành công !',display : 'flex' });
                setTimeout(() => { setLoaderConfig({ ...loaderConfig, content: '', display: 'none' }) }, 1000)
            } catch (error) {
                console.log(error);
            }
        }
    }


    return (
        <div>
            <Loader
                contentLoading={loaderConfig.content}
                style={{ display: loaderConfig.display }}
            />
             <Link to = {PATH.ADD_CATEGORY} className="bg-blue-500 block hover:bg-blue-dark ml-2 mt-2 px-4 py-2 rounded text-center text-white w-40">
                Thêm danh mục
            </Link>
            <div>
                <Table
                    onDelete  = {onDelete}
                    categories = {categories.length > 0 ? categories : []} 
                />
            </div>
        </div>
    );
}

export default Category;