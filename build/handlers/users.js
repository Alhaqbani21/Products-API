"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const dotenv_1 = __importDefault(require("dotenv"));
const verify_1 = require("./verify");
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, TOKEN_SECRET } = process.env;
const store = new user_1.UserStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        res.json(users);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const show = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = _req.params.id;
        if (!id) {
            return res.status(400).send('ID is required ');
        }
        const user = yield store.show(id);
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const username = req.body.username;
        const password = req.body.password;
        if (!firstname || !lastname || !username || !password) {
            res.status(400);
            res.send('Some required parameters are missing! eg. :firstName, :lastName, :userName, :password');
            return false;
        }
        const user = yield store.create({
            firstname,
            lastname,
            username,
            password
        });
        res.json((0, verify_1.getToken)(user));
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        if (!username || !password) {
            res.status(400);
            res.send('username or password is wrong');
            return false;
        }
        const user = yield store.authenticate(username, password);
        if (!user) {
            return res.status(401).send(`Wrong password ${username}.`);
        }
        res.json((0, verify_1.getToken)(user));
    }
    catch (err) {
        res.status(401);
        res.json(`${err} `);
        return;
    }
});
const destroy = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = _req.params.id;
        if (id == null) {
            res.status(400).send('Missing id as parameter.');
            return false;
        }
        yield store.delete(id);
        res.send(`User id: ${id} , has been deleted successfully `);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        if (!firstname || !lastname || !id) {
            res.status(400);
            res.send('Some required parameters are missing! eg. :firstName, :lastName, :id');
            return false;
        }
        const user = yield store.update(id, {
            firstname,
            lastname
        });
        res.json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const userRoutes = (app) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users/create', create);
    app.delete('/users/:id', verify_1.verifyUser, destroy);
    app.post('/users/authenticate', authenticate);
    app.put('/users/:id', verify_1.verifyUser, update);
};
exports.default = userRoutes;
//# sourceMappingURL=users.js.map