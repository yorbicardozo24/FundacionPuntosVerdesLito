import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import usersRoutes from './routes/Users/usersRoutes';
import LoginRoutes from './routes/Login/loginRoute';
import departamentos from './routes/Departamentos/departamentos';
import foundations from './routes/Foundations/foundations';
import uploadsRoutes from './routes/Uploads/uploadsRoutes';
const multipart =  require('connect-multiparty');

const multiPartMiddleware = multipart({
    uploadDir: './uploads'
});

var multipartMiddleware = multipart();

class Server {

    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        this.app.use(usersRoutes);
        this.app.use(LoginRoutes);
        this.app.use(departamentos);
        this.app.use(foundations);
        this.app.use(uploadsRoutes);
        // this folders for this application will be used to store public file images
        this.app.use('/uploads', express.static(path.resolve('uploads')));
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port ${this.app.get('port')}`);
        });
    }
}

const server = new Server();
server.start();