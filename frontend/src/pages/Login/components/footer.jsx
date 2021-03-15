import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '@/constants/Path';
import Facebook from 'react-facebook-login';


function Footer({onLogin,responseFacebook}) {
    return (
        <div>
            <div className='my-8 text-center text-gray-500'>___________Hoặc__________</div>
            <div className='text-center text-gray-600'>
            <Facebook
                    appId='531639271521254'
                    fields="name,email,picture"
                    onClick={onLogin}
                    callback={responseFacebook}
                    icon="fa-facebook mr-3"
                    cssClass="bg-blue-500 h-10 metro my-facebook-button-class rounded text-white w-full"
                    textButton = "Đăng nhập với Facebook"
            />
            </div>
        </div>
    );
}

export default Footer;