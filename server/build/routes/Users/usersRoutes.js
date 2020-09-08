"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersControllers_1 = __importDefault(require("../../controllers/usersControllers"));
class UsersRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/api/users', usersControllers_1.default.listUsers);
        this.router.get('/api/users/:id', usersControllers_1.default.getUser);
        this.router.post('/api/users', usersControllers_1.default.createUser);
        this.router.put('/api/users/:id', usersControllers_1.default.putUser);
        this.router.delete('/api/users/:id', usersControllers_1.default.deleteUser);
    }
}
const usersRoutes = new UsersRoutes();
exports.default = usersRoutes.router;
