import React, { useEffect, useRef, useState } from 'react';
import { $ } from '@/helpers/QuerySelector';
import Input from './components/input';
import Header from './components/header';
import { userIcon, emailIcon, keyIcon } from '@/assets/icons'
import Footer from './components/footer';
import Button from './components/button';
import AuthAPI from '@/services/authApi';
import Loader from '@/components/Loader';
import { Redirect } from 'react-router-dom';
import { PATH } from '@/constants/Path';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [configLoader,setConfigLoader] = useState({
        content : '',display : 'none'
    })
    const [redirect,setRedirect] = useState(false);
    const debounce = useRef();
    const [err, setErr] = useState({
        errName: null, errorPassword: null, errorEmail: null, errRepassword: null
    })
    const getValue = (element, setState) => setState(element);

    const handleUsername = (e) => {
        const name = e.target.value;
        if (name === '' || name.trim() === '')
            $('.errorUsername').innerHTML = 'Không được bỏ trống trường này .....';
        else {
            $('.errorUsername').innerHTML = '';
            getValue(name.trim(), setName);
            return setErr({ ...err, errName: '' })
        }
        return setErr({ ...err, errName: 'err' })
    }

    const handleEmail = (e) => {
        const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        const email = e.target.value;
        if (email === '' || email.trim() === '') {
            $('.errorEmail').innerHTML = 'Không được bỏ trống trường này .....';
        } else {
            if (pattern.test(email)) {
                $('.errorEmail').innerHTML = '';
                getValue(email.trim(), setEmail);
                if (debounce.current) clearTimeout(debounce.current);
                debounce.current = setTimeout(() => {
                    e.target.disabled = true;
                    AuthAPI.existEmail({ email })
                        .then(data => {
                            e.target.disabled = false;
                            if (data.length > 0) {
                                $('.errorEmail').innerHTML = 'Email đã được đăng kí bằng một tài khoản khác ,thử lại !';
                                return setErr({ ...err, errorEmail: 'err' })
                            }
                            else {
                                $('.errorEmail').innerHTML = '';
                                return setErr({ ...err, errorEmail: '' });
                            }
                        })
                        .catch(err => console.log(err));
                }, 500)
            } else {
                $('.errorEmail').innerHTML = 'Định dạng email không hợp lệ .....';
            }
        }
        return setErr({ ...err, errorEmail: 'err' })
    }

    const handlePassword = (e) => {
        const password = e.target.value;
        if (password === '' || password.trim() === '') {
            $('.errorPassword').innerHTML = 'Không được bỏ trống trường này .....';
        } else {
            if (password.trim().length < 8) {
                $('.errorPassword').innerHTML = 'Độ dài mật khẩu phải lớn hơn 8 kí tự .....';
            } else {
                $('.errorPassword').innerHTML = '';
                getValue(password.trim(), setPassword);

                return setErr({ ...err, errorPassword: '' })
            }
        }
        return setErr({ ...err, errorPassword: 'err' })
    }
    const handleRepassword = () => {
        const repassword = $('.repassword').value;
        if (repassword === '' || repassword.trim() === '') {
            $('.errorRepassword').innerHTML = 'Không được bỏ trống trường này .....';
        } else {
            if (repassword !== $('.password').value) {
                $('.errorRepassword').innerHTML = 'Mật khẩu nhập lại không khớp .....';
            } else {
                $('.errorRepassword').innerHTML = '';
                return setErr({ ...err, errRepassword: '' })
            }
        }
        return setErr({ ...err, errRepassword: 'err' })
    }

    //this effect will run when password change for handle password
    useEffect(() => {
        if ($('.repassword').value !== '') {
            handleRepassword();
        }
    }, [password]);
    const onSubmit = () => {
        let isSubmit = false;
        for (const key in err) {
            if (err[key] === '') isSubmit = true;
            else isSubmit = false;
        }
        if (isSubmit) {
            $('.errorSubmit').innerHTML = '';
            setConfigLoader({...configLoader,content : 'Đang đăng kí',display : ''})
            AuthAPI.register({name,email,password})
                        .then(res => {
                            if(res.message === 'success'){
                                setConfigLoader({...configLoader,content : 'Đăng kí thành công đang chuyển hướng ....',display : ''})
                                setTimeout(() => {
                                    setConfigLoader({...configLoader,content : '',display : 'none'})
                                    setRedirect(true);
                                },1000)
                            }
                        })
                        .catch(err => console.log(err));
        } else {
            $('.errorSubmit').innerHTML = 'Vui lòng nhập đầy đủ thông tin ....';
        }
    }
    if(redirect) return <Redirect to = {PATH.LOGIN} />
    return (
        <div>
            <div className='flex justify-center'>
                <div className='my-10 px-7 py-5 shadow w-1/3'>
                    <Loader 
                        contentLoading = {configLoader.content} 
                        style = {{display : configLoader.display}}
                    />
                    <Header />
                    <div>
                        <Input
                            name='username'
                            svgImage={userIcon}
                            title='Họ và tên'
                            onChange={handleUsername}
                            errClass='errorUsername'
                        />
                        <Input
                            name='email'
                            svgImage={emailIcon}
                            title='Email'
                            onChange={handleEmail}
                            errClass='errorEmail'
                        />
                        <Input
                            name='password'
                            svgImage={keyIcon}
                            title='Mật khẩu'
                            errClass='errorPassword'
                            onChange={handlePassword}
                        />
                        <Input
                            name='repassword'
                            svgImage={keyIcon}
                            title='Nhập lại mật khẩu'
                            errClass='errorRepassword'
                            onChange={handleRepassword}
                        />
                        <Button
                            title='Đăng kí'
                            onClick={onSubmit}
                        />
                        <div className='my-2 text-red-500 text-sm errorSubmit'></div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;