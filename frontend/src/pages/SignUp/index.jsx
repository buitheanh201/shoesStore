import React, { useState } from 'react';
import { $ } from '@/helpers/QuerySelector';
import AuthAPI from '@/services/authApi';

function SignUp() {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [gender,setGender] = useState('');



    const onSignUp = async(e) => {
        e.preventDefault();
        if(name != '' && email != '' && password != '' && gender != ''){
            $('.errorSubmit').innerHTML = '';
            const data = await AuthAPI.signUp({ name , email ,password,gender});
            console.log(data);
        }else{
            $('.errorSubmit').innerHTML = 'Điền đầy đủ thông tin !';
        }
    }
    const getValue = (e,setValue,classError) => {
        if(e.target.value === ''){
           $(classError).innerHTML = 'Không được bỏ trống trường này !';
           setValue(e.target.value);
        }else{
            setValue(e.target.value);
            $(classError).innerHTML = '';
        }
    }
    return (
        <div>
            <form action="">
                <p>Họ và tên</p>
                <input name = "name" onChange = {(e) => getValue(e,setName,'.errorName')} defaultValue = {name} type="text"/>
                <p className = 'errorName'></p>
                <p>Email </p>
                <input name = "email" onChange = {(e) => getValue(e,setEmail,'.errorEmail')} type="text"/>
                <p className = 'errorEmail'></p>
                <p></p>
                <p>Mật khẩu</p>
                <input name = "password" onChange = {(e) => getValue(e,setPassword,'.errorPassword')}  type="password"/>
                <p className = 'errorPassword'></p>
                <p>Giới tính</p>
                <label htmlFor="">Nam<input onChange = {e => setGender(e.target.value)} type="radio" value = {1} name="gender"/></label>
                <label htmlFor="">Nữ<input onChange = {e => setGender(e.target.value)} type="radio" value = {0} name="gender"/></label>
                <p className = 'errorRender'></p>
                <button onClick = {onSignUp}>Đăng kí</button>
                <p className = 'errorSubmit'></p>
            </form>
        </div>
    );
}

export default SignUp;