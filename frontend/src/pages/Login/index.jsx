import React, { useEffect, useState } from 'react';
import Footer from './components/footer';
import Button from './components/button';
import Loader from '@/components/Loader';
import Header from './components/header';
import Input from './components/input';
import { Redirect } from 'react-router-dom';
import { emailIcon, keyIcon } from '@/assets/icons';
import { $ } from '@/helpers/QuerySelector';
import { login,loginFacebook } from '@/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { getStorage,clearItemStorage } from '@/helpers/Storage';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [configLoader, setConfigLoader] = useState({
        display: 'none',
        content: ''
    });
    const [redirect,setRedirect] = useState(false);
    const dispatch = useDispatch();
    const [err, setErr] = useState({
        errEmail: null, errPassword: null
    });
    const account = useSelector(state => state.authentication.account);

    const responseFacebook = (res) => {
        setConfigLoader({...configLoader,content : 'Đang đăng nhập...',display : ''})
        const data = {
            id : res.id,
            name : res.name,
            email : res.email,
            picture : res.picture.data.url
        }
        dispatch(loginFacebook(data))
    }
    const handleEmail = (e) => {
        const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        const email = e.target.value;
        if (email === '' || email.trim() === '') {
            $('.errorEmail').innerHTML = 'Không được bỏ trống trường này .....';
        } else {
            if (pattern.test(email)) {
                setEmail(email.trim());
                $('.errorEmail').innerHTML = '';
                return setErr({ ...err, errEmail: '' })
            } else $('.errorEmail').innerHTML = 'Định dạng Email không hợp lệ .....';
        }
        setErr({ ...err, errEmail: 'err' })
    }
    const handlePassword = (e) => {
        const password = e.target.value;
        if (password === '') {
            $('.errorPassword').innerHTML = 'Không được bỏ trống trường này .....';
        } else {
            setPassword(password.trim());
            $('.errorPassword').innerHTML = '';
            return setErr({ ...err, errPassword: '' })
        }
        setErr({ ...err, errPassword: 'err' })
    }
    const onSubmit = () => {
        if (err.errEmail === '' && err.errPassword === '') {
            $('.errorSubmit').innerHTML = '';
            const cartLocal = getStorage('products');
            dispatch(login({ email, password ,cartLocal }));
            setConfigLoader({...configLoader,content : 'Đang đăng nhập...',display : ''})
        } else $('.errorSubmit').innerHTML = 'Nhập đầy đủ thông tin để tiếp tục !';
    }
    useEffect(() => {
        if (account.message) {
            if (account.message === 'incorrect') {
                setConfigLoader({...configLoader,content : 'Đang đăng nhập...',display : 'none'})
                $('.errorPassword').innerHTML = 'Thông tin tài khoản hoặc mật khẩu không chính xác ....';
            }
            else {
                $('.errorPassword').innerHTML = '';
                if (account.message === 'success') {
                    setConfigLoader({...configLoader,content : 'Đăng nhập thành công , đang chuyển hướng ....',display : ''});
                    setTimeout(() => {
                        localStorage.setItem('auth.token',account.token);
                        setRedirect(true);
                    },1000);
                }
            }
        }
    }, [account]);
    if(redirect) return <Redirect to = '/' />
    return (
        <div>
            <div className='flex justify-center'>
                <div className='my-10 px-7 py-5 shadow w-1/3'>
                    <Loader
                        contentLoading={configLoader.content}
                        style={{ display: configLoader.display }}
                    />
                    <Header />
                    <div>
                        <Input
                            type='text'
                            name='Email'
                            svgImage={emailIcon}
                            title='Email'
                            onChange={handleEmail}
                            errClass='errorEmail'
                        />
                        <Input
                            type='password'
                            name='password'
                            svgImage={keyIcon}
                            title='Mật khẩu'
                            errClass='errorPassword'
                            onChange={handlePassword}
                        />
                        <Button
                            title='Đăng nhập'
                            onClick={onSubmit}
                        />
                        <div className='my-2 text-red-500 text-sm errorSubmit'></div>
                        <Footer responseFacebook={responseFacebook} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;