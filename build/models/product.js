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
exports.ProductStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class ProductStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM products';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Unable to get products: ${err}`);
            }
        });
    }
    show(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM products WHERE id = $1';
                // @ts-ignore
                const result = yield database_1.default.query(sql, [productId]);
                return result.rows.length ? result.rows[0] : null;
            }
            catch (err) {
                throw new Error(`Unable to get product with ID ${productId}: ${err}`);
            }
        });
    }
    addProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, category } = product;
            try {
                const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3)';
                const values = [name, price, category];
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, values);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to add product: ${err}`);
            }
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM products WHERE id = $1';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to delete product with ID ${id}: ${err}`);
            }
        });
    }
    update(id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name: newName, price, category } = productData;
            try {
                const sql = 'UPDATE products SET name = $1, price = $2, category = $3 WHERE id = $4 RETURNING *';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [
                    newName,
                    price,
                    category,
                    id
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not update product ${newName}. ${err}`);
            }
        });
    }
}
exports.ProductStore = ProductStore;
//# sourceMappingURL=product.js.map