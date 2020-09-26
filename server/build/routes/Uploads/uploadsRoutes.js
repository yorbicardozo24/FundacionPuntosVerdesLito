"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadsControllers_1 = __importDefault(require("../../controllers/uploadsControllers"));
const jwt_1 = require("../../middlewares/jwt");
const role_1 = require("../../middlewares/role");
const multer_1 = __importDefault(require("../../config/multer"));
const multer_2 = __importDefault(require("multer"));
const uploader = multer_2.default({
    storage: multer_1.default
}).single('file');
class UploadsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/api/upload/excel', uploader, [jwt_1.checkJwt, role_1.checkRole('ADMIN')], uploadsControllers_1.default.uploadExcel);
        this.router.post('/api/upload/image/:id', uploader, [jwt_1.checkJwt], uploadsControllers_1.default.uploadImage);
    }
}
const uploadsRoutes = new UploadsRoutes();
exports.default = uploadsRoutes.router;
