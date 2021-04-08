import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import env from 'src/config';
import { ITokenLife,IAccount } from 'types/account';
import AccountModel from 'models/AccountModel';
import { CallbackError,Document } from 'mongoose';

export const accessToken = (req: Request | any, res: Response, next: NextFunction): void | Response => {
    const authorization: string[] | undefined = req.headers.authorization?.split(" ");
    const token = authorization ? authorization[1] : '';
    if(token != ''){
        try {
            const parse: string | object = jwt.verify(token, env.SECRET);
            req.accessToken = parse; 
            next();
        } catch (error) {
            //refesh token when expired 
            // if(error.message.indexOf('expired') != -1){
            //     const tokenLife : ITokenLife | any = jwt.verify(req.account.refeshToken,env.SECRET);
            //     AccountModel.findOne({ email : tokenLife.email , typeLogin : tokenLife.typeLogin },
            //     (err : CallbackError , docs : Document<IAccount>) => {
            //         if(err){
            //             return res.status(500).json({ message : 'No internet access !'})
            //         }
            //         req.refeshToken = jwt.sign({ _id : docs._id },env.SECRET,{ expiresIn : 60 });
            //         next();
            //     })  
            // }
            res.status(200).json({ message : 'json web token is Incorrect'})
        }
    }else return res.status(400).json({ message : 400 , data : 'Authorization header is not define !'})
}