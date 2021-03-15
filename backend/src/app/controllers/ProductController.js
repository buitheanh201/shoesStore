const ProductModel = require('../models/ProductModel');
const { authCredentials, authorize, createFolder, createFile,deleteFile,deleteFolder } = require('./../../helpers/useDrive');
const { v4: uuid } = require('uuid');

class ProductController {
    async findAll(req, res) {
        const { _sort,_page,_limit,_q } = req.query;
        if (Object.keys(req.query).length > 0) {
            if (_sort) {
                switch (_sort) {
                    case 'date': {
                        try {
                            const data = await ProductModel.find({}).sort({ createdAt: 'desc' }).limit(8).exec()
                            return res.status(200).json({ message: 'success', data })
                        } catch (error) {
                            return res.status(500).json({ message: 'error' })
                        }
                    }
                    case 'views': {
                        try {
                            const data = await ProductModel.find({}).sort({ views: 'desc' }).limit(8).exec()
                            return res.status(200).json({ message: 'success', data })
                        } catch (err) {
                            return res.status(500).json({ message: 'error' })
                        }
                    }
                }
            }else if(_page && _limit){
                //logic 
                //page = 0
                //product = 16
                //start = 0 * 16 => 0
                //end = start + product => 16
                try{
                    const skip = (_page - 1) * _limit;
                    const totalProduct = await ProductModel.countDocuments().exec();
                    const data = await ProductModel.find({}).skip(skip).limit(Number(_limit));
                    const pageSize = Math.ceil(totalProduct / _limit);
                    res.status(200).json({message : 'success',data,pageSize});
                }catch(error){
                    console.log(error);
                    res.status(500).json({ message: 'error' })
                }
            }else if(_q){
                try {
                    const data = await ProductModel.find({name: { $regex: `.*${_q}.*`,$options: 'i' } }).limit(5);
                    res.status(200).json({message : 'success',data});
                } catch (error) {
                     console.log(error);
                    res.status(500).json({ message: 'error' })
                }
            }
        }else{
            try {
                const data = await ProductModel.find({});
                res.status(200).json({message : 'success',data})
            } catch (error) {
                res.status(500).json({message : 'error',error});
            }
        }
    }
    async findOne(req, res) {
        try {
            const { id } = req.params
            const data = await ProductModel.findOne({ _id : id});
            res.status(200).json({message : 'success',data})
        } catch (error) {
            res.status(500).json({message : 'error',error});
        }
    }
    async create(req, res) {
        const { files } = req;
        const { name, price, oldPrice, sale, description, sizes, brandID } = req.body;
        const size = JSON.parse(sizes);
        try {
            const credentials = await authCredentials();
            const oAuthentication = await authorize(JSON.parse(credentials));
            const { data } = await createFolder(oAuthentication, `Product_${uuid()}`, '1nDOHR6a0yawtSt1ci8Q4OhJDk8qQwWzM');
            const response = await Promise.all(files.map(item => createFile(oAuthentication, item.originalname, data.id)))
            const dataImage = response.map(item => ({ _id: item.data.id, image: item.data.webContentLink }));
            const newProduct = new ProductModel({
                name, price, oldPrice, sale, sizes: size, description, imageGallery: dataImage, folderID: data.id, brandID
            })
            const saved = await newProduct.save();
            res.status(200).json({ message: 'success', data: saved });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    async delete(req, res) {
        const { id,folderID } = req.params;
        try {
        const credentials = await authCredentials();
        const oAuthentication = await authorize(JSON.parse(credentials));
        await deleteFolder(oAuthentication,folderID);
        const deleteProduct = await ProductModel.deleteOne({ _id : id });
        res.status(200).json({ message : 'success',data : deleteProduct});
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    async update(req, res) {
        const { files } = req;
        const { id } = req.params;
        const { oldGallery,name, price, oldPrice, sale, description, sizes, brandID } = req.body;
        const product = await ProductModel.findOne({ _id : id});
        if(files.length > 0 ){
            const credentials = await authCredentials();
            const oAuthentication = await authorize(JSON.parse(credentials))
            await Promise.all(JSON.parse(oldGallery).map(item => deleteFile(oAuthentication,item._id)));
            const response = await Promise.all(files.map(item => createFile(oAuthentication, item.originalname,product.folderID)))
            var dataImage = response.map(item => ({ _id: item.data.id, image: item.data.webContentLink }));
        }
        try {
            const updateResponse = await ProductModel.updateOne({ _id : id},{
                name, price, oldPrice, sale, description, sizes : JSON.parse(sizes), brandID ,
                imageGallery : files.length > 0 ? dataImage : product.imageGallery
            })
            res.status(200).json({ message: 'success', data: updateResponse });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}



module.exports = new ProductController();