"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersControllers_1 = __importDefault(require("../../controllers/usersControllers"));
const jwt_1 = require("../../middlewares/jwt");
const role_1 = require("../../middlewares/role");
const multer_1 = __importDefault(require("../../config/multer"));
const multer_2 = __importDefault(require("multer"));
const uploader = multer_2.default({
    storage: multer_1.default
}).single('file');
class UsersRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        // Get all users
        this.router.get('/api/users', [jwt_1.checkJwt, role_1.checkRole('ADMIN')], usersControllers_1.default.listUsers);
        // Get one user
        this.router.get('/api/users/:id', [jwt_1.checkJwt], usersControllers_1.default.getUser);
        // Create new user
        this.router.post('/api/users', usersControllers_1.default.createUser);
        // Register user
        this.router.post('/api/users/register', uploader, usersControllers_1.default.registerUser);
        // Edit user
        this.router.put('/api/users/:id', [jwt_1.checkJwt], usersControllers_1.default.putUser);
        // Edit user from ADMIN
        this.router.patch('/api/users/:id', [jwt_1.checkJwt, role_1.checkRole('ADMIN')], usersControllers_1.default.patchUser);
        // Change password
        this.router.post('/api/users/password/:id', [jwt_1.checkJwt], usersControllers_1.default.changePasswordUser);
        // Forget Password
        this.router.post('/api/users/forget-password', usersControllers_1.default.forgetPassword);
        // Forget Password Code
        this.router.post('/api/users/forget-password-code', usersControllers_1.default.forgetPasswordCode);
        // Change forget password
        this.router.post('/api/users/change-forget-password', usersControllers_1.default.changeForgetPassword);
        // Change status
        this.router.post('/api/users/status/:id', [jwt_1.checkJwt, role_1.checkRole('ADMIN')], usersControllers_1.default.changeStatus);
        // Delete user
        this.router.delete('/api/users/:id', [jwt_1.checkJwt, role_1.checkRole('ADMIN')], usersControllers_1.default.deleteUser);
    }
}
const usersRoutes = new UsersRoutes();
exports.default = usersRoutes.router;
