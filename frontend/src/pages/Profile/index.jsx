import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/header';
import Avatar from './components/avatar';
import Info from './components/info';
import AuthAPI from './../../services/authApi';
import Loader from '@/components/Loader';
import { Redirect } from 'react-router-dom';


function Profile() {
    const dispatch = useDispatch();
    const account = useSelector(state => state.authentication.account.data);
    const patternPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [avatar, setAvatar] = useState('');
    const [error, setError] = useState({ errorName: null, errorPhoneNumber: null, errorSubmit: null })
    const [loaderConfig, setLoaderConfig] = useState({ content: '', display: 'none' });
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (account) {
            setName(account.name);
            setEmail(account.email);
            setAddress(account.address);
            setPhoneNumber(account.phoneNumber)
        }
    }, [account]);

    const getName = (e) => {
        if (e.target.value === '') setError({ ...error, errorName: 'Không được bỏ trốn trường này....' })
        else {
            setError({ ...error, errorName: null });
            setName(e.target.value);
        }
    }
    const getPhoneNumber = e => {
        if (e.target.value !== '') {
            if (patternPhoneNumber.test(e.target.value)) {
                setError({ ...error, errorPhoneNumber: '' })
                setPhoneNumber(e.target.value)
            }
            else {
                setError({ ...error, errorPhoneNumber: 'Định dạng số điện thoại không hợp lệ !' })
            }
        } else setError({ ...error, errorPhoneNumber: null })
    }
    const getAddress = e => setAddress(e.target.value);

    const onChangeAvatar = (e) => setAvatar(e);

    const onSubmit = async () => {
        if (error.errorName === null && (error.errorPhoneNumber === '' || error.errorPhoneNumber === null)) {
            setLoaderConfig({ ...loaderConfig, content: 'Đang cập nhật...', display: 'flex' })
            setError({ ...error, errorSubmit: '' });
            const form = new FormData()
            if (avatar !== '') {
                form.append('avatar', avatar)
            }
            form.append('name', name);
            form.append('phoneNumber', phoneNumber);
            form.append('address', address);
            const { data } = await AuthAPI.update(account._id, form);
            dispatch({ type: 'UPDATE_ACCOUNT', payload: data });
            setLoaderConfig({ ...loaderConfig, content: 'Cập nhật thành công ,đang chuyển hướng ! ', display: 'flex' });
            setTimeout(() => {
                setRedirect(true)
            }, 1000);
        } else setError({ ...error, errorSubmit: 'Tồn tại trường dữ liệu không hợp lệ !' })
    }
    if(redirect) return <Redirect to = '/' />
    return (
        <div className='bg-gray-100 py-4'>
            <div className='mx-auto w-5/6'>
                <Loader
                    contentLoading={loaderConfig.content}
                    style={{ display: loaderConfig.display }}
                />
                <div className='bg-white px-2 py-4 rounded text-gray-700 text-sm'>BTA Shop | Trang cá nhân</div>
                <div className='bg-white my-3 p-3'>
                    <Header />
                    <div className='flex'>
                        {account ?
                            <Info
                                getAddress={getAddress}
                                getPhoneNumber={getPhoneNumber}
                                errorName={error.errorName}
                                errorPhoneNumber={error.errorPhoneNumber}
                                getName={getName}
                                name={name}
                                email={email}
                                address={address}
                                phoneNumber={phoneNumber}
                            />
                            : null}
                        {account ?
                            <Avatar
                                onChangeAvatar={onChangeAvatar}
                                avatar={account.avatar}
                            />
                            : null}
                    </div>
                </div>
                <p className='my-2 text-red-500 text-sm'>{error.errorSubmit}</p>
                <div><button onClick={onSubmit} className='bg-blue-600 h-9 rounded text-white w-32'>Lưu</button></div>
            </div>
        </div>
    );
}

export default Profile;