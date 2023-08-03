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
const SECRET = process.env.TOKEN_SECRET;
describe('Product Handler', () => {
    const product = {
        name: 'Black T-shirt',
        price: 1000,
        category: 'T-shirt'
    };
    let token, userId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            username: 'X3zZ',
            firstname: 'Abdulaziz',
            lastname: 'Alhaqbani',
            password: '123'
        };
        const { body } = yield request.post('/users/create').send(userData);
        token = body;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { user } = jsonwebtoken_1.default.verify(body, SECRET);
        userId = user.id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .delete(`/users/${userId}`)
            .set('Authorization', 'bearer ' + token);
    }));
    it('gets the create endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post('/products/create')
            .send(product)
            .set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
    }));
    it('gets the index endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/products');
        expect(res.status).toBe(200);
    }));
    it('gets the read endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get(`/products/1`);
        expect(res.status).toBe(200);
    }));
    it('gets the update endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const newProductData = Object.assign(Object.assign({}, product), { name: 'Blue Pants', price: 150, category: 'Pants' });
        const res = yield request
            .put(`/products/1`)
            .send(newProductData)
            .set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
    }));
    it('gets the delete endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .delete(`/products/1`)
            .set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
    }));
});
//# sourceMappingURL=product.spec.js.map