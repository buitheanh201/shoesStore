import { body, validationResult } from 'express-validator';
import { Request , Response , NextFunction } from 'express';

export const signUpValidator = async (req : Request , res : Response , next : NextFunction) => {
    await body('email')
            .trim()
            .notEmpty()
            .withMessage('Không được để trống email !')
            .isEmail()
            .withMessage('Email không hợp lệ')
            .toLowerCase()
            .run(req);
    await body('password')
            .trim()
            .notEmpty()
            .withMessage('Không được để trống passowrd')
            .toLowerCase()
            .isLength({
                max : 20,
                min : 8
            })
            .withMessage('Mật khẩu phải lớn hơn 8 kí tự')
            .run(req);
    await body('name')
            .trim()
            .notEmpty()
            .withMessage('Không được để trống tên của bạn')
            .run(req);
    const result : any = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({
            message : 400, 
            data : result.errors
        })
    }
    next();
}