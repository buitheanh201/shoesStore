const CategoryModel = require('./../models/CategoryModel');
const { authCredentials,authorize,createFolder,createFile,deleteFile,deleteFolder } = require('./../../helpers/useDrive');
const { v4 : uuid } = require('uuid');

class CategoryController {
    // async findAll(req,res){
    //     try {
    //         const data = await CategoryModel.find({})
    //         res.status(200).json({message : 'success',data});
    //     } catch (error) {
    //         res.status(500).json({message : error});
    //     }
    // }
    // async findOne(req,res){
    //     const { id } = req.params;
    //     try {
    //         const data = await CategoryModel.findOne({ _id : id});
    //         res.status(200).json({message : 'success',data});
    //     } catch (error) {
    //         res.status(500).json({message : error});
    //     }
    // }
    // async create(req,res){
    //     try {
    //         const credentials = await authCredentials();
    //         const oAuthentication = await authorize(JSON.parse(credentials));
    //         const { data:folderID} = await createFolder(oAuthentication,`category_0${uuid()}`,'1jLEDbgPm5flz-6lbPYZaa_2V17AKaaVE');
    //         const { data : fileID} = await createFile(oAuthentication,req.file.originalname,folderID.id)
    //         const { name } = req.body;
    //         const newCategory = new CategoryModel({
    //             categoryImage : {_id : fileID.id,avatar : fileID.webContentLink},categoryName : name,folderID : folderID.id
    //         })
    //         const response = await newCategory.save();
    //         res.status(200).json({message : 'success',data : response})
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).json({message : error});
    //     }
    // }
    // async update(req,res){
    //     const { id } = req.params;
    //     const { file } = req;
    //     const { name } = req.body;
    //     try {
    //         const data = await CategoryModel.findOne({ _id : id});
    //         if(file){
    //             const credentials = await authCredentials();
    //             const oAuthentication = await authorize(JSON.parse(credentials));
    //             const removeFile = await deleteFile(oAuthentication,data.categoryImage._id)
    //             var { data : fileID} = await createFile(oAuthentication,file.originalname,data.folderID);
    //         }
    //         const updateCategory = await CategoryModel.updateOne({ _id : id},{
    //             categoryName : name,categoryImage : file ? {_id : fileID.id,avatar : fileID.webContentLink} : data.categoryImage
    //         })
    //         res.status(200).json({message : 'success',data : updateCategory})
    //     } catch (error) {
    //         res.status(500).json({message : error});
    //     }
    // }
    // async delete(req,res){
    //     const { id ,folderID } = req.params;
    //     try {
    //         const credentials = await authCredentials();
    //         const oAuthentication = await authorize(JSON.parse(credentials));
    //         await deleteFolder(oAuthentication,folderID);
    //         const deleteProduct = await CategoryModel.deleteOne({ _id : id });
    //         res.status(200).json({ message : 'success',data : deleteProduct});
    //         } catch (error) {
    //             res.status(500).json({ message: error });
    //         }
    // }
}




export default new CategoryController();