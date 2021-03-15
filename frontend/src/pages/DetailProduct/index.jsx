import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findOneProduct } from '@/actions/product';
import Header from './components/header';
import Gallery from './components/gallery';
import Info from './components/info';
import Description from './components/description';
import Comment from './components/comment';

function DetailProduct(props) {
    const { match } = props;
    const product = useSelector(state => state.product.detailProduct);

    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0,0);
        if (product._id !== match.params.id) dispatch(findOneProduct(match.params.id));
    }, []);
    return (
        <div className='bg-gray-100'>
            <div className='mx-auto w-5/6'>
                <Header title={product.name} />
                <div className='bg-white flex pb-7'>
                    <div className='w-1/2'>
                        {Object.keys(product).length > 0 ?
                            <Gallery
                                imageGallery={product.imageGallery}
                            />
                            : null
                        }
                    </div>
                    <div className='w-1/2'>
                        {Object.keys(product).length > 0 ?
                            <Info
                                idProduct = {match.params.id}
                                picture = {product.imageGallery[0].image}
                                comments = {product.comments.length}
                                name = {product.name}
                                price = {product.price}
                                oldPrice = {product.oldPrice}
                                sizes={product.sizes}
                                views = {product.views}
                            />
                            : null
                        }
                    </div>
                </div>
                <div className='bg-white mt-3 px-4 py-4'>
                    {Object.keys(product).length > 0 ?
                        <Description
                            description={product.description}
                        />
                        : null
                    }
                </div>
                <div className='bg-white mt-3 px-4 py-4'>
                    {Object.keys(product).length > 0 ?
                        <Comment
                           
                        />
                        : null
                    }
                </div>
            </div>
        </div>
    );
}

export default DetailProduct;