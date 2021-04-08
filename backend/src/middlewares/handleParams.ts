import ProductModel from 'models/ProductModel';
import AccountModel from 'models/AccountModel';
import { Request, Response, NextFunction } from 'express';
import { CallbackError, Document } from 'mongoose';
import { IProduct } from 'types/product';
import { IAccount } from 'types/account';

export const findProductById = (req: Request | any,res: Response,next: NextFunction,id: string) => {
    ProductModel.findById(id,(err: CallbackError,docs: Document<IProduct> | null): void | Response => {
            if (err) {
                return res.status(500).json({ message: 500, data: err.message });
            }
            req.product = docs;
            next();
        }
    );
};

export const findAccountById = (req: Request | any,res: Response,next: NextFunction,id: string) => {
    AccountModel.findById(id,(err: CallbackError,docs: Document<IAccount> | null): void | Response => {
            if (err) {
                return res.status(500).json({ message: 500, data: err.message });
            }
            req.account = docs;
            next();
        }
    );
};
