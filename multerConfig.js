import multer from 'multer';
import path from 'path';

export const configs = {
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.resolve('uploads'));
        },
        filename: (req, file, callback) => {
            // the filename will be an unique id based on the time and the original name
            const time = new Date().getTime();

            callback(null, `${time}_${file.originalname}`);
        },
    }),
    limits: {
        // File size max is 2MB
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, callback) => {
        // Only PDF Files
        const allowedMimes = [
            'application/pdf'
        ];

        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(false);
        }
    },
};