import ProductModel from 'models/ProductModel';
import { v4 as uuid } from 'uuid';
import { Request, Response } from 'express';
import { CallbackError, Document } from 'mongoose';
import { IProduct } from 'src/@types/product';
import { IResponseFile, IResponseFolder } from 'types/drive';
import { createFolder ,createFile, Drive , deleteFile } from 'helpers/useDrive';
import _ from 'lodash';

class ProductController {
    findAll(req: Request, res: Response): void {
        ProductModel.find({},( error: CallbackError, docs: Document<IProduct> | null): void | Response => {
                if (error) {
                    return res.status(500).json({ message: 500 });
                }
                res.status(200).json({ message: 200, data: docs });
            }
        );
    }
    findOne(req: Request | any, res: Response): Response {
        return res.status(200).json({ message: 200, data: req.product });
    }

    async create(req: Request, res: Response) { 
        const folderID : IResponseFolder = await createFolder(`product-${uuid()}`,Drive.productFolder);

        const FileRequest : Express.Multer.File[] | any = req.files;

        const File : IResponseFile[] = await Promise.all(
            FileRequest.map((file : Express.Multer.File) => {
                return createFile(file.originalname,folderID.data.id)
            })
        )
        const imageGallery = File.map(item => 
            ({ _id : item.data.id , image : item.data.webContentLink })
        )
        const { brandID ,description,name,oldPrice,price
        ,sale } = req.body;
        const data : IProduct = {
            name,brandID,description,oldPrice,price,sale,imageGallery,folderID : folderID.data.id
        }
        // console.log(data);
        const product = new ProductModel(data);
        product.save((err : CallbackError ,docs : Document<IProduct>) => {
            if(err){
                return res.status(400).json({ message : 'error', error : err.message})
            }
            res.status(200).json({ message : 'success', data : docs})
        })
    }
    // async delete(req, res) {
    //     const { id,folderID } = req.params;
    //     try {
    //     const credentials = await authCredentials();
    //     const oAuthentication = await authorize(JSON.parse(credentials));
    //     await deleteFolder(oAuthentication,folderID);
    //     const deleteProduct = await ProductModel.deleteOne({ _id : id });
    //     res.status(200).json({ message : 'success',data : deleteProduct});
    //     } catch (error) {
    //         res.status(500).json({ message: error });
    //     }
    // }
    async update(req : Request | any, res : Response ) {
        const { files } = req; 
        let product = req.product;
        //check files.length when upload file 
        if(files.length > 0){
            
        }
    }
}

export default new ProductController();
