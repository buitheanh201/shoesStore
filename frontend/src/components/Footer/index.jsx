import React from 'react';
import Info from './Info';
import Page from './Pages';
import SendMail from './SendMail';
import Service from './Services';
import Introduce from './Introduce';

function Footer() {
    return (
        <>
            <Introduce />
            <div className='footer flex flex-wrap justify-between px-10 py-7'>
                <Info />
                <Service />
                <Page />
                <SendMail />
            </div>
        </>
    );
}

export default Footer;