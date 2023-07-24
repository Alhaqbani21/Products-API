"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.getToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = process.env.TOKEN_SECRET;
const getToken = (user) => {
    return jsonwebtoken_1.default.sign({ user }, SECRET);
};
exports.getToken = getToken;
const verifyUser = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Access denied, invalid token' });
        return false;
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        jsonwebtoken_1.default.verify(token, SECRET);
        next();
    }
    catch (error) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
};
exports.verifyUser = verifyUser;
//# sourceMappingURL=verify.js.map