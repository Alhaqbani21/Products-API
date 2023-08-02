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
exports.UserStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;
class UserStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            const conn = yield database_1.default.connect();
            try {
                const sql = 'SELECT * FROM users';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`unable get users: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM users WHERE id=($1)';
                //@ts-ignoreX$
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`unable show user ${id}: ${err}`);
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstname, lastname, username, password } = user;
            try {
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users (firstname, lastname, username, password_digest) VALUES($1, $2, $3, $4) RETURNING *';
                const hash = bcrypt_1.default.hashSync(password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS, 10));
                const { rows } = yield conn.query(sql, [
                    firstname,
                    lastname,
                    username,
                    hash
                ]);
                conn.release();
                return rows[0];
            }
            catch (err) {
                throw new Error(`Could not add new user ${firstname} ${lastname}. ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM users WHERE id=($1)';
                yield conn.query(sql, [id]);
                conn.release();
                return true;
            }
            catch (err) {
                throw new Error(`unable delete user (${id}): ${err}`);
            }
        });
    }
    update(id, newUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3 RETURNING *';
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const { rows } = yield conn.query(sql, [
                    newUserData.firstname,
                    newUserData.lastname,
                    id
                ]);
                conn.release();
                return rows[0];
            }
            catch (err) {
                throw new Error(`Not able to update user ${newUserData.firstname}. ${err}`);
            }
        });
    }
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            const conn = yield database_1.default.connect();
            const sql = 'SELECT password_digest FROM users WHERE username=($1)';
            const result = yield conn.query(sql, [username]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(password + pepper, user.password_digest)) {
                    return user;
                }
            }
            return null;
        });
    }
}
exports.UserStore = UserStore;
//# sourceMappingURL=user.js.map