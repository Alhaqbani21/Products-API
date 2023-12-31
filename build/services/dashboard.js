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
exports.DashboardQueries = void 0;
//@ts-ignore
const database_1 = __importDefault(require("../database"));
class DashboardQueries {
    // Get all products that have been included in orders
    productsInOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const sql = `SELECT products.name, products.price, order_products.order_id 
      FROM products 
      INNER JOIN order_products ON products.id = order_products.product_id
`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`unable to get products and orders: ${err}`);
            }
        });
    }
    usersWithOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'SELECT username FROM users INNER JOIN orders ON users.id = orders.user_id';
                const result = yield conn.query(sql);
                conn.release;
                return result.rows;
            }
            catch (err) {
                throw new Error(`unable get users with orders: ${err}`);
            }
        });
    }
    fiveMostExpensive() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'SELECT name, price FROM products ORDER BY price DESC LIMIT 5';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`unable get products by price: ${err}`);
            }
        });
    }
}
exports.DashboardQueries = DashboardQueries;
//# sourceMappingURL=dashboard.js.map