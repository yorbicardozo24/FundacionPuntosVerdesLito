"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const storage = multer_1.default.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, `${uuid_1.v4()}-${Date.now()}${file.originalname}`);
    }
});
exports.default = storage;
