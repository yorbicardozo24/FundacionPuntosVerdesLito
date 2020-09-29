"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const usersRoutes_1 = __importDefault(require("./routes/Users/usersRoutes"));
const loginRoute_1 = __importDefault(require("./routes/Login/loginRoute"));
const departamentos_1 = __importDefault(require("./routes/Departamentos/departamentos"));
const foundations_1 = __importDefault(require("./routes/Foundations/foundations"));
const uploadsRoutes_1 = __importDefault(require("./routes/Uploads/uploadsRoutes"));
const multipart = require('connect-multiparty');
const multiPartMiddleware = multipart({
    uploadDir: './uploads'
});
var multipartMiddleware = multipart();
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(usersRoutes_1.default);
        this.app.use(loginRoute_1.default);
        this.app.use(departamentos_1.default);
        this.app.use(foundations_1.default);
        this.app.use(uploadsRoutes_1.default);
        // this folders for this application will be used to store public file images
        this.app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port ${this.app.get('port')}`);
        });
    }
}
const server = new Server();
server.start();
