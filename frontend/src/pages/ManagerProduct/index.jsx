import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '@/constants/Path';
import Table from './components/table';
import ProductAPI from '@/services/productApi';
import Loader from './../../components/Loader';

function ManagerProduct() {

    const [products, setProducts] = useState([]);
    const [loaderConfig, setLoaderConfig] = useState({ content: '', display: 'none' })

    useEffect(() => {
        const fetchAll = async () => {
            const { data: products } = await ProductAPI.findAll();
            setProducts(products);
        }
        fetchAll();
    }, [])

    const onDelete = async (product) => {
        const isDelete = confirm('Xác nhận xóa sản phẩm ?');
        if (isDelete) {
            try {
                setLoaderConfig({ ...loaderConfig, display: 'flex', content: 'Đang xóa sản phẩm...' })
                const res = await ProductAPI.delete(product._id, product.folderID);
                const reRender = products.filter(item => item._id !== product._id);
                setProducts(reRender);
                setLoaderConfig({ ...loaderConfig, content: 'Xóa sản phẩm thành công !' });
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
            <Link to={PATH.ADD_PRODUCT} className="bg-blue-500 block hover:bg-blue-dark ml-2 mt-2 px-4 py-2 rounded text-center text-white w-40">
                Thêm sản phẩm
            </Link>
            <div className="px-3 py-4 flex justify-center">
                <Table
                    onDelete={onDelete}
                    products={products.length > 0 ? products : []}
                />
            </div>
        </div>
    );
}

export default ManagerProduct;