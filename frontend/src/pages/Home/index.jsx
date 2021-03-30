import React, { useEffect, useState } from 'react';
import Banner from './components/banner';
import ProductItem from '@/components/ProductItem';
import CategoryAPI from '@/services/categoryApi';
import { Link } from 'react-router-dom';
import ProductAPI from '@/services/productApi';
import useSlug from '@/hooks/useSlug';
import useFormat from '@/hooks/useFormat';

function Home() {

    const [categories, setCategories] = useState([]);
    const [newProduct,setNewProduct] = useState([]);
    const [mostViews,setMostViews] = useState([]);
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const { data: categories } = await CategoryAPI.findAll();
                const { data: newProducts } = await ProductAPI.findAll({ _sort: 'date' });
                const { data : mostViewedProduct} = await ProductAPI.findAll( {_sort : 'views'} )
                setCategories(categories);
                setNewProduct(newProducts);
                setMostViews(mostViewedProduct);
                console.log(mostViewedProduct);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategory();
    }, []);

    return (
        <div>
            <Banner />
            <div className='mx-auto w-5/6'>
                <div className='font-medium py-10 text-2xl text-gray-700'>
                    - BTA Shop | Sản phẩm mới cập nhật
                </div>
                <div className='flex flex-wrap'>
                   {/* {newProduct.map((item,key) => 
                     <ProductItem 
                        key = {key}
                        name = {item.name}
                        price = {`${useFormat(item.price)}đ`}
                        oldPrice = {`${useFormat(item.oldPrice)}đ`}
                        link = {`/detail/${useSlug(item.name)}&${item._id}`}
                        image = {item.imageGallery[0].image}
                     />
                   )} */}
                </div>
                <div className='font-medium py-10 text-2xl text-gray-700 mb-3'>
                    - BTA Shop | Sản phẩm xem nhiều nhất
                </div>
                <div className='flex flex-wrap'>
                {/* {mostViews.map((item,key) => 
                     <ProductItem 
                        key = {key}
                        name = {item.name}
                        price = {`${useFormat(item.price)}đ`}
                        oldPrice = {`${useFormat(item.oldPrice)}đ`}
                        link = {`/detail/${useSlug(item.name)}&${item._id}`}
                        image = {item.imageGallery[0].image}
                     />
                   )} */}
                </div>
                <div className='font-medium py-10 text-2xl text-gray-700 mb-3'>
                    - BTA Shop | Mua sắm theo danh mục
                </div>
                <div className='flex flex-wrap'>
                    {/* {categories.map((item, key) =>
                        <div key={key} className='category flex'>
                            <Link
                                style={{ backgroundImage: `url(${item.categoryImage.avatar})` }}
                                className='m-auto' to=''>
                            </Link>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
}

export default Home;