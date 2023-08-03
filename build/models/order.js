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
exports.OrderStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class OrderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get orders. Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE id =$1';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find order ${id}. Error: ${err}`);
            }
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const { products, user_id, status } = order;
            try {
                const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const { rows } = yield conn.query(sql, [status, user_id]);
                const newOrder = rows[0];
                const orderProductsSql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING product_id, quantity';
                const orderProducts = [];
                for (const product of products) {
                    const { product_id, quantity } = product;
                    const { rows } = yield conn.query(orderProductsSql, [
                        newOrder.id,
                        product_id,
                        quantity
                    ]);
                    orderProducts.push(rows[0]);
                }
                conn.release();
                return Object.assign(Object.assign({}, newOrder), { products: orderProducts });
            }
            catch (err) {
                throw new Error(`Could not add new order for user ${user_id}. ${err}`);
            }
        });
    }
    destroyOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const orderProductsQuery = 'DELETE FROM order_products WHERE order_id=($1)';
                yield conn.query(orderProductsQuery, [id]);
                const ordersQuery = 'DELETE FROM orders WHERE id=($1)';
                const result = yield conn.query(ordersQuery, [id]);
                const orderResult = result.rows[0];
                conn.release();
                return orderResult;
            }
            catch (err) {
                throw new Error(`not able to delete order with id: ${id} , Error: ${err}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
//# sourceMappingURL=order.js.map