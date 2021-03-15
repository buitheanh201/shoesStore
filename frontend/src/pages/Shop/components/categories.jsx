import React from 'react';
import { Link } from 'react-router-dom';
import useSlug from './../../../hooks/useSlug'

function Categories(props) {
    const { categories } = props;
    return (
        <div className='categories flex space-x-6'>
            {categories.map((item, key) => {
                return <div className='w-1/6 flex relative' key={key}>
                    <div className='m-auto'>
                        <Link className='block' to={`/shop/brand/${useSlug(item.categoryName)}`}>
                            <img src={item.categoryImage.avatar} alt="Hình ảnh thương hiệu" />
                        </Link>
                    </div>
                    <Link to={`/shop/brand/${useSlug(item.categoryName)}`} className='absolute'>
                        {item.categoryName}
                    </Link>
                </div>
            })}
        </div>
    );
}

export default Categories;