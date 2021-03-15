import React, { useEffect } from 'react';
import Banner_01 from '@/assets/images/banner1.png';
import Banner_02 from '@/assets/images/banner2.png';
import { $$,$ } from '@/helpers/QuerySelector';
import PreviousIcon from '@/assets/images/previous.svg';
import NextIcon from '@/assets/images/next.svg';

function Banner() {
    const config = {
        currentBanner: 1,
        animateIn: '',
        animateOut: ''
    }
    const initialBanner = () => {
        const totalBanner = $$('.banner__box');
        for (let i = 0; i < totalBanner.length; i++) {
            totalBanner[i].style.opacity = 0;
            totalBanner[i].style.zIndex = 0;
        }
        totalBanner[config.currentBanner].style.opacity = 1;
        totalBanner[config.currentBanner].style.zIndex = 1;
    }
    //core slider
    //all function will call in this function
    const handleSlider = (n) => {
        const totalBanner = $$('.banner__box');
        if (n > config.currentBanner) {
            if (n > totalBanner.length - 1) n = 0;
            config.animateOut = 'animate__fadeOutDown';
            config.animateIn = 'animate__fadeInDown';
        }
        else if (n < config.currentBanner) {
            if (n < 0) n = totalBanner.length - 1;
            config.animateIn = 'animate__fadeInUp';
            config.animateOut = 'animate__fadeOutUp';
        }
        if (n != config.currentBanner) {
            const current = totalBanner[config.currentBanner];
            const next = totalBanner[n];
            totalBanner.forEach(item => {
                item.style.opacity = 0;
                item.style.zIndex = 0;
            });
            totalBanner[config.currentBanner].classList.add(config.animateOut);
            totalBanner[n].classList.add(config.animateIn);
            totalBanner[n].style.opacity = 1;
            totalBanner[n].style.zIndex = 1;
            totalBanner[n].addEventListener('animationend', () => {
                current.classList.remove(config.animateOut);
                next.classList.remove(config.animateIn);
            })
        }
        handleImage(n, 800, 1, 'animate__backInRight')
            .then(() => handleImage(n, 1000, 0, 'animate__rotateIn'))
        handleIntroduce(n, 700, 0)
            .then(() => handleIntroduce(n, 200, 1))
            .then(() => handleIntroduce(n, 200, 2))
            .then(() => handleIntroduce(n, 200, 3));
        handleDots(n);
        config.currentBanner = n;
    }
    //move slider 
    const moveSlider = (index) => {
        handleSlider(config.currentBanner + index);
    }
    //handle introduce 

    const handleIntroduce = (indexBanner, timeShow, indexElm) => {
        const introduce = $$('.banner__introduce');
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                introduce.forEach((item, key) => {
                    if (key === indexBanner) {
                        item.childNodes[indexElm].style.opacity = 1;
                        item.childNodes[indexElm].classList.add('animate__jackInTheBox');
                    }
                    else {
                        item.childNodes[indexElm].style.opacity = 0;
                        item.childNodes[indexElm].classList.remove('animate__jackInTheBox');
                    }
                    resolve('next');
                })
            }, timeShow)
        })
    }

    //handle image 
    const handleImage = (indexBanner, timeShow, indexElm, animateName) => {
        const boxImage = $$('.banner__boxImage');
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                boxImage.forEach((item, key) => {
                    if (key === indexBanner) {
                        item.childNodes[indexElm].style.opacity = 1;
                        item.childNodes[indexElm].classList.add(animateName)
                    } else {
                        item.childNodes[indexElm].style.opacity = 0;
                        item.childNodes[indexElm].classList.remove(animateName)
                    }
                    resolve('next');
                })
            }, timeShow)
        })
    }

    //handle dots
    const handleDots = (indexBanner) => {
        const totalDots = $$('.dots span');
        totalDots.forEach((item,key) => {
            if(key === indexBanner){
              item.classList.add('dotConfig');
            }else{
                item.classList.remove('dotConfig');
            }
        })
    }

    //initial dots
    const initialDots = () => {
        const dots = $('.dots');
        const totalBanner = $$('.banner__box');
        totalBanner.forEach(() => {
            dots.innerHTML += '<span></span>';
        });
    }
    //this effect will handling all function
    //and run when component loaded
    useEffect(() => {
        initialBanner();
        handleIntroduce(config.currentBanner, 800, 0)
            .then(() => handleIntroduce(config.currentBanner, 300, 1))
            .then(() => handleIntroduce(config.currentBanner, 300, 2))
            .then(() => handleIntroduce(config.currentBanner, 300, 3));
        handleImage(config.currentBanner, 800, 1, 'animate__backInRight')
            .then(() => handleImage(config.currentBanner, 1000, 0, 'animate__rotateIn'));
        initialDots();
        handleDots(config.currentBanner);
    }, []);

    return (
        <div className='banner relative'>
            <div className='animate__animated absolute banner__box bg-gray-100 flex left-0 py-10 top-0 w-full'>
                <div className='w-2/4 relative'>
                    <div className='-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 transform w-2/3 banner__introduce'>
                        <p className='animate__animated my-4 text-5xl uppercase'>JOGARBOLA X-FACTOR</p>
                        <p className='animate__animated mb-4'>
                            <span className='font-bold text-2xl text-red-600'>800.000đ</span>
                            <span className='line-through mx-4 text-gray-500 text-lg'>1.230.000đ</span>
                        </p>
                        <p className='animate__animated mb-4 text-gray-600'>
                            Jogabola ra mắt phiên bản mới cải tiến với nhiều ưu điểm vượt trội,
                            Trọng lượng siêu nhẹ giúp bạn xử lý linh hoạt trong mọi tình huống,
                            Thiết kế thon gọn, ôm chân nhưng không hề gây khó chịu.
                        </p>
                        <p className='animate__animated'>
                            <button className='bg-blue-500 h-10 hover:bg-blue-600 leading-10 rounded text-white w-40'>Chi tiết</button>
                        </p>
                    </div>
                </div>
                <div className='w-2/4 flex relative banner__boxImage'>
                    <div className='absolute bg-yellow-400 flex h-24 left-32 rounded-full top-20 w-24 animate__animated'>
                        <div className='font-medium mx-auto my-auto text-center text-xl w-1/2'>REAL 100%</div>
                    </div>
                    <img className='mx-auto animate__animated' src={Banner_02} alt="banner thứ hai" />
                </div>
            </div>
            <div className='animate__animated absolute banner__box bg-gray-100 flex left-0 py-10 top-0 w-full'>
                <div className='w-2/4 relative'>
                    <div className='banner__introduce -translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 transform w-2/3'>
                        <p className='animate__animated my-4 text-5xl uppercase'>MIZUNO MORELIA TF</p>
                        <p className='animate__animated mb-4'>
                            <span className='font-bold text-2xl text-red-600'>2.850.000đ</span>
                            <span className='line-through mx-4 text-gray-500 text-lg'>3.930.000đ</span>
                        </p>
                        <p className='animate__animated mb-4 text-gray-600'>
                            Sản phẩm cao cấp nhất, được yêu thích nhất thương hiệu giày bóng đá Mizuno.
                            Trọng lượng siêu nhẹ giúp di chuyển linh hoạt, nhanh nhậy, hiệu quả.
                            Đế kết hợp cộng nghệ giảm chấn giúp êm chân, hạn chế chấn thương khi tranh chấp bóng.
                        </p>
                        <p className='animate__animated'>
                            <button className='bg-blue-500 h-10 hover:bg-blue-600 leading-10 rounded text-white w-40'>Chi tiết</button>
                        </p>
                    </div>
                </div>
                <div className='w-2/4 flex relative banner__boxImage'>
                    <div className='absolute bg-yellow-400 flex h-24 left-32 rounded-full top-20 w-24 animate__animated'>
                        <div className='font-medium mx-auto my-auto text-center text-xl w-1/2'>REAL 100%</div>
                    </div>
                    <img className='mx-auto animate__animated' src={Banner_01} alt="banner thứ nhất" />
                </div>
            </div>
            <div className='-translate-y-1/2 absolute directional flex justify-between px-7 top-1/2 transform w-full z-10'>
                <div onClick={() => moveSlider(-1)} className='cursor-pointer hover:bg-gray-200 p-2 rounded-full'>
                    <img className='h-7 w-7' src={PreviousIcon} alt="" />
                </div>
                <div onClick={() => moveSlider(1)} className='cursor-pointer hover:bg-gray-200 p-2 rounded-full'>
                    <img className='h-7 w-7' src={NextIcon} alt="" />
                </div>
            </div>
            <div className = 'dots'></div>
        </div>
    );
}

export default React.memo(Banner);