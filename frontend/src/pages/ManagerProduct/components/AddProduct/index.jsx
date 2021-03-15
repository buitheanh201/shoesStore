import React, { useEffect, useRef, useState } from 'react';
import { $, $$ } from '@/helpers/QuerySelector';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadFile } from '@/helpers/Firebase';
import CategoryAPI from '@/services/categoryApi';
import Loader from './../../../../components/Loader';
import ProductAPI from './../../../../services/productApi';
import { Redirect } from 'react-router-dom';

function AddProduct() {
    const [image, setImage] = useState('');
    const editor = useRef();
    const [redirect, setRedirect] = useState(false);
    const description = useRef();
    const [loaderConfig, setLoaderConfig] = useState({ content: '', style: { display: 'none' } })
    const [categories, setCategories] = useState([]);
    const onAddSize = () => {
        $('.sizeProduct').innerHTML += `<div class = 'my-3'>
            <input type="number" 
            class="bg-gray-100 border-4 focus:bg-white h-10 mr-3 px-2 rounded size" 
            placeholder = 'kích cỡ.....' />
            <input type="number" 
            class="focus:bg-white quantity bg-gray-100 h-10 mr-3 px-2 rounded border-4" 
            placeholder = 'Số lượng.....' />
            <input type = "button" 
            class = "bg-red-600 cursor-pointer delete-size h-10 hover:bg-red-700 px-3 rounded text-white" 
            value = "Loại bỏ" />
        </div>`;
        $$('.delete-size').forEach(item => {
            if (item.onclick === null) {
                item.onclick = (e) => {
                    e.target.parentElement.remove()
                }
            }
        })
    }
    const handleImage = async () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click()
        input.onchange = async e => {
            const file = e.target.files[0];
            const targetEditor = editor.current.getEditor();
            const curentSpace = targetEditor.getSelection(true);
            const res = await uploadFile(file.name, file);
            targetEditor.insertEmbed(curentSpace.index, 'image', res);
        }
    }
    const moduleQuill = {
        toolbar: {
            container: [
                [{ 'header': '1' }, { 'header': '2' }, { 'header': '3' }, { 'header': '4' }, { 'font': [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                'image': handleImage
            }
        }
    }
    useEffect(() => {
        CategoryAPI.findAll()
            .then(({ data }) => setCategories(data))
            .catch(err => console.log(err))
    }, [])
    const validate = (e) => {
        const err = e.target.nextSibling;
        if (e.target.value === '') {
            err.classList.replace('text-green-600', 'text-red-600')
            err.innerHTML = 'Không được để trống trường này ....'
        } else {
            err.classList.replace('text-red-600', 'text-green-600')
            err.innerHTML = 'Dữ liệu hợp lệ !';
        }
    }
    const getDescription = (value) => description.current = value
    const onSubmit = async () => {
        const totalSize = $$('.size');
        const totalQuantity = $$('.quantity');
        const error = $$('.error-field');
        let isSubmit = false;
        const sizes = [];
        totalSize.forEach((item, key) => {
            sizes.push({
                size: Number(item.value),
                inventory: Number(totalQuantity[key].value)
            })
        });
        for (var i = 0; i < error.length; i++) {
            if (error[i].innerHTML == 'Dữ liệu hợp lệ !') {
                isSubmit = true;
            } else {
                isSubmit = false
                break;
            }
        }
        if (isSubmit) {
            window.scrollTo(0, 0);
            setLoaderConfig({ ...loaderConfig, style: { display: 'flex', zIndex: 10 }, content: 'Đang tạo sản phẩm....' })
            const form = new FormData();
            for (let i = 0; i < image.length; i++) { form.append('galleryProduct', image[i]) }
            //name, price, oldPrice, sale, sizes, description
            form.append('name', $('.name').value)
            form.append('price', $('.price').value)
            form.append('oldPrice', $('.oldPrice').value)
            form.append('sale', $('.sale').value);
            form.append('sizes', JSON.stringify(sizes));
            form.append('description', description.current);
            form.append('brandID', $('.category').value);
            try {
                const response = await ProductAPI.create(form)
                setLoaderConfig({ ...loaderConfig, style: { display: 'flex', zIndex: 10 }, content: 'Tạo sản phẩm thành công ,đang chuyển hướng !' })
                setTimeout(() => {
                    setRedirect(true)
                }, 1500)
            } catch (error) {
                console.log(error);
            }
        } else {
            $('.error-submit').innerHTML = 'Hãy nhập đầy đủ thông tin !'
        }
    }
    if (redirect) return <Redirect to='/admin/products' />
    return (
        <div className='px-4 py-5'>
            <Loader
                contentLoading={loaderConfig.content}
                style={loaderConfig.style}
            />
            <div>
                <p className='font-medium my-2'>Tên sản phẩm</p>
                <input
                    onChange={e => validate(e)}
                    className='bg-gray-100 border focus:bg-white h-10 name px-2 rounded w-full'
                    type="text" placeholder='Tên sản phẩm....' />
                <p className='my-2 text-red-600 text-sm error-field'></p>
                <p className='font-medium my-2'>Giá sản phẩm</p>
                <input onChange={e => validate(e)} className='price bg-gray-100 border focus:bg-white h-10 px-2 rounded w-full' type="number" placeholder='Giá sản phẩm...' />
                <p className='my-2 text-red-600 text-sm error-field'></p>
                <p className='font-medium my-2'>Giá ban đầu</p>
                <input onChange={e => validate(e)} className='oldPrice bg-gray-100 border focus:bg-white h-10 px-2 rounded w-full' type="number" placeholder='Giá ban đầu....' />
                <p className='my-2 text-red-600 text-sm error-field'></p>
                <p className='font-medium my-2'>Hình ảnh sản phẩm</p>
                <input className='rounded bg-gray-100 border py-2 w-full' onChange={(e) => setImage(e.target.files)} type="file" multiple placeholder='Hình ảnh sản phẩm' />
                <p className='font-medium my-2'>Khuyến mãi đi kèm</p>
                <input onChange={e => validate(e)} className='sale bg-gray-100 border focus:bg-white h-10 px-2 rounded w-full' type="text" placeholder='Khuyến mãi' />
                <p className='my-2 text-red-600 text-sm error-field'></p>
                <p className='font-medium my-2'>Thương hiệu sản phẩm</p>
                <select className='bg-gray-100 border category cursor-pointer h-10 round w-full'>
                    {categories.map((item, key) => <option key={key} value={item._id}>{item.categoryName}</option>)}
                </select>
                <p className='font-medium my-2'>Mô tả sản phẩm</p>
                <ReactQuill
                    ref={data => editor.current = data}
                    value={description}
                    modules={moduleQuill}
                    onChange={getDescription}
                    theme='snow'
                />
                <p className='font-medium my-2'>Kích cỡ sản phẩm ( Size giày )</p>
                <button className='bg-blue-500 block h-10 my-4 rounded text-white w-40' onClick={onAddSize}>Thêm size</button>
                <div className='sizeProduct'></div>
                <div><button className='bg-blue-500 block h-10 my-4 rounded text-white w-40' onClick={onSubmit}>Thêm sản phẩm</button></div>
                <p className='my-2 text-red-600 text-sm error-submit'></p>
            </div>
        </div>
    );
}

export default AddProduct;