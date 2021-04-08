import { Request , Response, NextFunction } from 'express';

export const isAuthentication = (req : Request | any, res : Response , next : NextFunction) : void | Response => {
    const auth = req.account && req.accessToken && (req.account._id === req.accessToken._id);
    if(!auth){
        return res.status(400).json({ message : 400 , data : 'Truy cập bị từ chối'})
    }
    next();
}

export const isManager = (req : Request | any , res : Response , next : NextFunction) : void | Response => {
    const role = req.account.role;
    if(role == 3){
        return next();
    }
    res.status(400).json({ message : 400 , data : 'Truy cập bị từ chối'})
}

export const isMemberShip = (req : Request | any , res : Response , next : NextFunction) : void | Response => {
    const role = req.account.role;
    if(role == 2 || role == 3){
        return next();
    }
    res.status(400).json({ message : 400 , data : 'Truy cập bị từ chối'})
}

