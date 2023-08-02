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
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const SECRET = process.env.TOKEN_KEY;
describe('User Handler', () => {
    const userData = {
        username: 'ChrisAnne',
        firstname: 'Chris',
        lastname: 'Anne',
        password: 'password123'
    };
    let token, userId = 1;
    it('should gets the create endpoint', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/users/create').send(userData);
        const { body, status } = res;
        token = body;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { user } = jsonwebtoken_1.default.verify(token, SECRET);
        userId = user.id;
        expect(status).toBe(200);
        done();
    }));
    it('should gets the index endpoint', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get('/users')
            .set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
        done();
    }));
    it('should get the read endpoint', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get(`/users/${userId}`)
            .set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
        done();
    }));
    it('should get the update endpoint', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const newUserData = Object.assign(Object.assign({}, userData), { firstname: 'Chris', lastname: 'Anne' });
        const res = yield request
            .put(`/users/${userId}`)
            .send(newUserData)
            .set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
        done();
    }));
    it('should get the auth endpoint', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post('/users/authenticate')
            .send({
            username: userData.username,
            password: userData.password
        })
            .set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
        done();
    }));
    it('should get the auth endpoint with wrong password', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post('/users/authenticate')
            .send({
            username: userData.username,
            password: 'trtdtxcfcf'
        })
            .set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(401);
        done();
    }));
    it('should get the delete endpoint', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .delete(`/users/${userId}`)
            .set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
        done();
    }));
});
//# sourceMappingURL=user.spec.js.map