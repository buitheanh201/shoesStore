import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/header';
import Table from './components/table';
import Payment from './components/payment';
import { $$, $ } from '@/helpers/QuerySelector';
import { editCart, deleteCartItem } from './../../actions/auth';
import { clearItemStorage, getStorage, setStorage } from './../../helpers/Storage';
import ProductAPI from './../../services/productApi';

function Cart() {
    const [cartsLocal, setCartLocal] = useState([])
    const [itemSelected, setItemSelected] = useState([]);
    const account = useSelector(state => state.authentication.account?.data);
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
    },[])
    useEffect(() => {
        const fetchAll = async () => {
            let cartLocal = account?.carts || getStorage('products');
            if (cartLocal) {
                const filterID = cartLocal.map(item => item.idProduct);
                const uniqueID = filterID.filter((id, key) => filterID.indexOf(id) === key);
                const fetchAllProduct = await Promise.all(uniqueID.map(item => ProductAPI.findOne(item)));
                cartLocal = cartLocal.map(product => fetchAllProduct.map(({ data }) => {
                    if (product.idProduct === data._id) {
                        product.picture = data.imageGallery[0].image;
                        product.name = data.name;
                        product.price = data.price
                        return product;
                    }
                    return product;
                })[0]);
                setCartLocal(cartLocal);
            } else setCartLocal([]);
        }
        fetchAll();
    }, [account]);

    const onSelectItem = (e, itemProduct) => {
        const itemSelect = [...itemSelected];
        const inputItem = $('#totalProducts');
        if (inputItem.checked) inputItem.checked = false;
        if (e.target.checked) {
            itemSelect.push(itemProduct);
            setItemSelected(itemSelect);
        } else {
            const filter = itemSelected.filter(item => item._id != itemProduct._id || item.size !== itemProduct.size);
            setItemSelected(filter);
        }
    }

    const onSelectedAll = (e) => {
        const inputItem = $$('.product_item>div>input');
        if (e.target.checked) {
            inputItem.forEach(item => item.checked = true);
            setItemSelected(cartsLocal);
        } else {
            inputItem.forEach(item => item.checked = false);
            setItemSelected([]);
        }
    }

    const onChangeQuantity = (quantity, item) => {
        const inputItem = $$('.product_item>div>input');
        if (itemSelected.length > 0) setItemSelected([]);
        inputItem.forEach(item => item.checked = false);
        const handleQuantity = item.quantity * 1 + quantity * 1;
        if (handleQuantity >= 1) {
            if (account?.carts) {
                dispatch(editCart(account._id,item._id,{ quantity }))
            } else {
                const cart = getStorage('products');
                setStorage('products', cart.map(product => {
                    if (product._id === item._id) {
                        product.quantity += quantity;
                        return product;
                    }
                    return product;
                }));
                setCartLocal(cartsLocal.map(product => {
                    if (product._id === item._id) {
                        product.quantity += quantity;
                        return product;
                    }
                    return product;
                }))
            }
        } else {
            const isDelete = confirm('Xác nhận xóa sản phẩm này ?');
            if (isDelete) {
                if (account?.carts) {
                    dispatch(deleteCartItem(account._id,item._id))
                } else {
                    const cart = getStorage('products');
                    setStorage('products', cart.filter(product => item._id !== product._id));
                    setCartLocal(cartsLocal.filter(product => item._id !== product._id))
                }
            }
        }
    }

    const onDelelte = (item) => {
        const isDelete = confirm('Xác nhận xóa sản phẩm này ?');
        if (isDelete) {
            if (isDelete) {
                if (account?.carts) {
                    dispatch(deleteCartItem(account._id,item._id))
                } else {
                    const cart = getStorage('products');
                    setStorage('products', cart.filter(product => item._id !== product._id));
                    setCartLocal(cartsLocal.filter(product => item._id !== product._id))
                }
            }
        }
    }

    const onDeleteAll = () => {
        if (itemSelected.length === 0) {
            alert('Chưa có sản phẩm nào được chọn !')
        } else {
            if (account?.carts) {

            } else {
                if (cartsLocal.length === 1) {
                    clearItemStorage('products');
                    setCartLocal([])
                } else {
                    if (itemSelected.length === cartsLocal.length) {
                        clearItemStorage('products');
                        setCartLocal([]);
                        setItemSelected([]);
                    } else {
                        let cloneCart = [...cartsLocal];
                        itemSelected.filter(itemSelected => {
                            const filter = [];
                            const filterCart = [];
                            getStorage('products').forEach(item => {
                                if (item._id !== itemSelected._id) {
                                    filter.push(item);
                                }
                            });
                            cloneCart.forEach(item => {
                                if (item._id !== itemSelected._id) {
                                    filterCart.push(item);
                                }
                            })
                            cloneCart = filterCart;
                            setStorage('products', filter);
                        });
                        setCartLocal(cloneCart);
                        setItemSelected([]);
                    }
                }
            }
        }
    }
    const onCheckout = () => {

    }
    return (
        <div className='bg-gray-100 py-6'>
            <div className='cart mx-auto w-5/6'>
                <Header />
                <div>
                    {cartsLocal.length > 0 ?
                        <Table
                            onDelelte={onDelelte}
                            onChangeQuantity={onChangeQuantity}
                            onSelectItem={onSelectItem}
                            carts={cartsLocal}
                        /> :
                        null}
                    {cartsLocal.length > 0 ?
                        <Payment
                            onDeleteAll={onDeleteAll}
                            carts={cartsLocal}
                            onSelectedAll={onSelectedAll}
                            itemSelected={itemSelected}
                            onCheckout = {onCheckout}
                        /> :
                        null}
                </div>
            </div>
        </div>
    );
}

export default Cart;