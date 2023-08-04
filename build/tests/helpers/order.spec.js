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
const order_1 = require("../../models/order");
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('Order Handler', () => {
    let token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            username: 'X3zZ',
            firstname: 'Abdulaziz',
            lastname: 'Alhaqbani',
            password: '123'
        };
        const productData = {
            name: 'Blue Pants',
            price: 234,
            category: 'Pants'
        };
        const { body: userBody } = yield request
            .post('/users/create')
            .send(userData);
        token = userBody;
        spyOn(order_1.OrderStore.prototype, 'create').and.returnValue(Promise.resolve({
            id: 1,
            products: [
                {
                    product_id: 5,
                    quantity: 5
                }
            ],
            user_id: 3,
            status: 'active'
        }) // Explicitly cast the return value to Order type
        );
    }));
    it('Checked create order Endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post('/orders/create')
            .set('Authorization', 'Bearer ' + token)
            .send({
            id: 1,
            products: [
                {
                    product_id: 5,
                    quantity: 5
                }
            ],
            user_id: 3,
            status: 'active'
        });
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            id: 1,
            products: [
                {
                    product_id: 5,
                    quantity: 5
                }
            ],
            user_id: 3,
            status: 'active'
        });
    }));
    it('Checked index Endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get('/orders')
            .set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
    }));
    it('Checked show Endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get(`/orders/1`)
            .set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
    }));
    it('Checked delete Endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .delete(`/orders/2`)
            .set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
    }));
});
//# sourceMappingURL=order.spec.js.map