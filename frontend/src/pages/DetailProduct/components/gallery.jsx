import React, { useEffect } from 'react';
import { $$ } from '@/helpers/QuerySelector';

function Gallery(props) {
    const configImage = {
        current : 0,
        animationIn : '',
        animationOut : ''
    }
    const { imageGallery } = props;

    const setUp = () => {
        const pictures = $$('.product_gallery img');
        const thumbnails = $$('.product_gallery-thumbnail img');
        pictures.forEach(item => item.style.opacity = 0);
        pictures[configImage.current].style.opacity = 1;
        pictures[configImage.current].style.zIndex = 1;
        thumbnails[configImage.current].classList.add('border-blue-500');
        thumbnails[configImage.current].classList.add('rounded-xl');
    }
    const handlePicture = (n) => {
        const totalPictures = $$('.product_gallery img');
        const thumbnails = $$('.product_gallery-thumbnail img');
        if(n > configImage.current){
            if(n > totalPictures.length - 1) n = 0;
            configImage.animationIn = 'animate__bounceInDown';
            configImage.animationOut = 'animate__fadeOutLeft';
        }
        else{
            if(n < 0) n = totalPictures.length - 1;
        }
        if(n !== configImage.current){
            const current = totalPictures[configImage.current];
            const next = totalPictures[n];
            totalPictures.forEach((item,key) => {
                item.style.opacity = 0;
                item.style.zIndex = 0;
                thumbnails[key].classList.remove('border-blue-500');
                thumbnails[key].classList.remove('rounded-xl');
            });
            totalPictures[n].style.opacity = 1;
            totalPictures[n].style.zIndex = 1;
            thumbnails[n].classList.add('border-blue-500');
            thumbnails[n].classList.add('rounded-xl');
            current.classList.add(configImage.animationOut);
            next.classList.add(configImage.animationIn);
            totalPictures[n].addEventListener('animationend', () => {
                current.classList.remove(configImage.animationOut);
                next.classList.remove(configImage.animationIn);
            })
        }  
        configImage.current = n;
    }

    useEffect(() => {
        setUp();
    },[]);

    return (
        <>
            <div className = 'product_gallery'>
               {
                   imageGallery.map((item,key) => 
                      <img key = {key} className='animate__animated mx-auto my-3 w-2/3' src={item.image} alt="hình ảnh minh họa" />
                   )
               }
            </div>
            <div className='flex justify-center mt-10 product_gallery-thumbnail'>
                {imageGallery?.map((item, key) =>
                    <div onClick = {() => handlePicture(key)} className='mx-2' key={key}>
                        <img className='border w-24 cursor-pointer' src={item.image} alt="hình ảnh minh họa" />
                    </div>
                )}
            </div>
        </>
    );
}

export default Gallery;