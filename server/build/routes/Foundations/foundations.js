"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const foundationsController_1 = __importDefault(require("../../controllers/foundationsController"));
const jwt_1 = require("../../middlewares/jwt");
const role_1 = require("../../middlewares/role");
const multer_1 = __importDefault(require("../../config/multer"));
const multer_2 = __importDefault(require("multer"));
const uploader = multer_2.default({
    storage: multer_1.default
}).single('file');
class Foundations {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/api/foundations', [jwt_1.checkJwt], foundationsController_1.default.getFoundations);
        this.router.get('/api/foundation/:id', [jwt_1.checkJwt], foundationsController_1.default.getFoundation);
        this.router.get('/api/history/:id', [jwt_1.checkJwt], foundationsController_1.default.history);
        this.router.get('/api/historyadmin', [jwt_1.checkJwt, role_1.checkRole('ADMIN')], foundationsController_1.default.historyAdmin);
        this.router.get('/api/report', [jwt_1.checkJwt, role_1.checkRole('ADMIN')], foundationsController_1.default.report);
        this.router.get('/api/ods', [jwt_1.checkJwt], foundationsController_1.default.getOds);
        this.router.get('/api/cs', [jwt_1.checkJwt], foundationsController_1.default.getCs);
        this.router.get('/api/clearpoints', [jwt_1.checkJwt, role_1.checkRole('ADMIN')], foundationsController_1.default.deletePoints);
        this.router.post('/api/foundations', [jwt_1.checkJwt, role_1.checkRole('ADMIN')], foundationsController_1.default.createFoundation);
        this.router.post('/api/foundations/donate/:id', [jwt_1.checkJwt], foundationsController_1.default.donatePoints);
        this.router.post('/api/sendpoints', foundationsController_1.default.sendPoints);
        this.router.put('/api/foundations/:id', [jwt_1.checkJwt, role_1.checkRole('ADMIN')], foundationsController_1.default.updateFoundation);
        this.router.get('/api/dpfoundation/:id', [jwt_1.checkJwt, role_1.checkRole('ADMIN')], foundationsController_1.default.deletePointsByone);
        this.router.get('/api/epfoundation/', [jwt_1.checkJwt, role_1.checkRole('ADMIN')], foundationsController_1.default.erasePoints);
        this.router.delete('/api/foundations/:id', [jwt_1.checkJwt, role_1.checkRole('ADMIN')], foundationsController_1.default.deleteFoundation);
    }
}
const foundations = new Foundations();
exports.default = foundations.router;
