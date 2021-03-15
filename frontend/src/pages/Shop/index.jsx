import React, { useEffect, useRef, useState } from 'react';
import CategoryAPI from '@/services/categoryApi';
import Header from './components/header';
import Categories from './components/categories';
import ProductAPI from '@/services/productApi';
import ProductItem from '@/components/ProductItem';
import useSlug from '@/hooks/useSlug';
import useFormat from '@/hooks/useFormat';
import Panination from './components/panination';

function Shop() {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSizes,setPageSizes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data: categories } = await CategoryAPI.findAll();
            const { data: products, pageSize } = await ProductAPI.findAll({ _page: currentPage, _limit: 16 })
            setProducts(products);
            setCategories(categories);
            
            const totalPageSize = [];
            for (let i = 0; i < pageSize; i++) { totalPageSize.push(i + 1) }
            setPageSizes(totalPageSize);
        }
        fetchData();
    }, []);
    return (
        <div className='w-5/6 mx-auto'>
            <div className='py-5 text-gray-600'>
                <p>Trang chủ / Cửa hàng</p>
            </div>
            <div>
                <Header />
                <Categories
                    categories={categories}
                />
                <div className='my-10 text-gray-700'>BTA Shop có <span className='font-bold mx-0.5'>{products.length}</span> sản phẩm dành cho bạn</div>
                <div className='flex flex-wrap'>
                    {products.map((item, key) =>
                        <ProductItem
                            key={key}
                            name={item.name}
                            price={`${useFormat(item.price)}đ`}
                            oldPrice={`${useFormat(item.oldPrice)}đ`}
                            link={`/detail/${useSlug(item.name)}&${item._id}`}
                            image={item.imageGallery[0].image}
                        />
                    )}
                </div>
                <div className='flex py-5'>
                    {products.length > 0 ?
                        <Panination
                            pageSizes={pageSizes}
                            currentPage={currentPage}
                        />
                        : null}
                </div>
            </div>
        </div>
    );
}

export default Shop;