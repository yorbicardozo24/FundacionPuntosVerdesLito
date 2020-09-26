import multer from 'multer';
import {v4 as uuidv4} from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'))
    },
    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}-${Date.now()}${file.originalname}`)
    }
})

export default storage;