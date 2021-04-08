import { Request, Response } from 'express';
import AccountModel from 'models/AccountModel';
import { CallbackError, Document } from 'mongoose';
import { IAccount } from 'types/account';
import { IResponseFolder } from 'types/drive';
import { v4 as uuid } from 'uuid';
import env from 'src/config';
import jwt from 'jsonwebtoken';
import { createFolder, Drive } from 'helpers/useDrive';
import { typeLogin } from 'types/account';

class AuthController {

    signin(req: Request, res: Response): void | Response {
        const { email, password } = req.body;
        AccountModel.findOne({ email }, (error: CallbackError, docs: Document<IAccount> | any) => {
            if (error) {
                return res.status(500).json({ message: 500, data: 'server is an error !' })
            }
            if (docs === null) {
                return res.status(200).json({ message: 'Username or email is incorrect' })
            }

            const checkPassword: boolean = docs.verifyPassword(password);
            
            if (!checkPassword) return res.status(200).json({ message: 'Username or email is incorrect' });

            const token = jwt.sign({ _id: docs._id }, env.SECRET, { expiresIn: 60 * 60});

            res.status(200).json({
                message: 'success',
                token,
                data: docs
            })

        })
    }

    async signup(req: Request, res: Response) {

        const folderID: IResponseFolder = await createFolder(`user-${uuid()}`, Drive.accountFolder);

        const refeshToken: string = jwt.sign(
            { ...req.body, typeLogin: typeLogin.system },
            env.SECRET,
            { expiresIn: env.TOKEN_LIFE }
        );
        const accountRequest: object = { ...req.body, refeshToken, _id: uuid(), folderID: folderID.data.id }
        const createAccount = new AccountModel(accountRequest);
        createAccount.save((err: CallbackError, dataSaved: Document<IAccount>) => {
            if (err) {
                console.log(err.message);
                return res.status(500).json({ message: 500, data: 'server is an error !' });
            }
            res.status(200).json({
                message: 200,
                data: dataSaved
            })
        })
    }

}


export default new AuthController;