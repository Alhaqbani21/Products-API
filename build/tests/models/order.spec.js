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
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const user_1 = require("../../models/user");
const product_1 = require("../../models/product");
const orderStore = new order_1.OrderStore();
describe('Order Model', () => {
    const userStore = new user_1.UserStore();
    const productStore = new product_1.ProductStore();
    let order, user_id, product_id;
    function createOrder(order) {
        return orderStore.create(order);
    }
    function deleteOrder(id) {
        return orderStore.destroyOrder(id);
    }
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userStore.create({
            username: 'X3zZ',
            firstname: 'Abdulaziz',
            lastname: 'Alhaqbani',
            password: '123'
        });
        user_id = parseInt(user.id);
        const product = yield productStore.addProduct({
            name: 'Black T-shirt',
            price: 150,
            category: 'T-shirt'
        });
        product_id = parseInt(product.id);
        order = {
            products: [
                {
                    product_id,
                    quantity: 5
                }
            ],
            user_id,
            status: 'active'
        };
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield userStore.delete(user_id);
        yield productStore.deleteProduct(product_id);
    }));
    it('should have an index method', () => {
        expect(orderStore.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(orderStore.show).toBeDefined();
    });
    it('should have a add method', () => {
        expect(orderStore.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(orderStore.destroyOrder).toBeDefined();
    });
    it('should add an order', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdOrder = yield createOrder(order);
        expect(parseInt(createdOrder.user_id)).toEqual(user_id);
        expect(parseInt(createdOrder.products[0].product_id)).toEqual(product_id);
        if (createdOrder.id) {
            yield deleteOrder(createdOrder.id);
        }
        else {
            fail('Invalid order id');
        }
    }));
    it('should remove the order item', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdOrder = yield createOrder(order);
        if (createdOrder.id) {
            yield deleteOrder(createdOrder.id);
            const orderList = yield orderStore.index();
            expect(orderList).toEqual([]);
        }
        else {
            fail('Invalid order id'); // Fail the test if id is undefined
        }
    }));
});
//# sourceMappingURL=order.spec.js.map