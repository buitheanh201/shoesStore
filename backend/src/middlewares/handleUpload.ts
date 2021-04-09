import multer, { Multer } from 'multer';
import { Request } from 'express';
import path from 'path';

const diskStorage = multer.diskStorage({
    destination: (
        req: Request,
        fileName: Express.Multer.File,
        callback: (error: Error | null, destination: string) => any
    ): void | undefined => {
        callback(null, path.join(__dirname, '../../public/static/media'));
    },
    filename: (
        req: Request,
        fileName: Express.Multer.File,
        callback: (error: Error | null, filename: string) => void
    ): void => {
        callback(null, fileName.originalname);
    },
});

const initialStorage: Multer = multer({ storage: diskStorage ,limits : { fileSize : 1 * 1024 * 1024} });

export default initialStorage;
