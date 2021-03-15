import React from 'react';
import arrowIcon from '@/assets/images/two-way.svg';
import protectionIcon from '@/assets/images/protection.svg';
import paymentIcon from '@/assets/images/payment.svg';
import carShippingIcon from '@/assets/images/carShipping.svg';

function Introduce() {
    return (
        <div className='footer__introduce'>
            <div className = 'flex my-auto'>
                <img className='h-10 mr-4 my-auto w-10' src={carShippingIcon} alt="carshipping icon" />
                <div className = 'font-medium text-lg w-3/4'> freeship cho đơn hàng 999k</div>
            </div>
            <div className = 'flex my-auto'>
                <img className='h-10 mr-4 w-10' src={arrowIcon} alt="arrow icon" />
                <div className = 'font-medium my-auto text-lg'> Đổi trả dễ dàng</div>
            </div>
            <div className = 'flex my-auto'>
                <img className='h-10 mr-4 w-10' src={protectionIcon} alt="protection icon" />
                <div className = 'font-medium my-auto text-lg'>Bảo hành dài hạn</div>
            </div>
            <div className = 'flex my-auto'>
                <img className='h-10 mr-4 w-10' src={paymentIcon} alt="payment icon" />
                <div className = 'font-medium my-auto text-lg'>Thanh toán nhận hàng</div>
            </div>
        </div>
    );
}

export default Introduce;