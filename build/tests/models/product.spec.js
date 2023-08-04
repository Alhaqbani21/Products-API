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
const product_1 = require("../../models/product");
const productStore = new product_1.ProductStore();
describe('Product Model', () => {
    const product = {
        name: 'Black T-shirt',
        price: 1000,
        category: 'T-shirt'
    };
    function createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return productStore.addProduct(product);
        });
    }
    function deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return productStore.deleteProduct(id);
        });
    }
    it('Get index method implemented', () => {
        expect(productStore.index).toBeDefined();
    });
    it('Get show method implemented', () => {
        expect(productStore.show).toBeDefined();
    });
    it('Get add method implemented', () => {
        expect(productStore.addProduct).toBeDefined();
    });
    it('Get delete method implemented', () => {
        expect(productStore.deleteProduct).toBeDefined();
    });
    it('should add a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield createProduct(product);
        expect(createdProduct).toEqual(Object.assign({ id: createdProduct.id }, product));
        yield deleteProduct(createdProduct.id);
    }));
    it('should return the product', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield createProduct(product);
        const productData = yield productStore.show(createdProduct.id);
        expect(productData).toEqual(createdProduct);
        yield deleteProduct(createdProduct.id);
    }));
    it('should update the product', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield createProduct(product);
        const newProduct = {
            name: 'New Product List',
            price: 1234,
            category: 'New category'
        };
        const { name, price, category } = yield productStore.update(createdProduct.id, newProduct);
        expect(name).toEqual(newProduct.name);
        expect(price).toEqual(newProduct.price);
        expect(category).toEqual(newProduct.category);
        yield deleteProduct(createdProduct.id);
    }));
    it('should remove the product', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield createProduct(product);
        expect(createdProduct).toEqual({
            id: createdProduct.id,
            name: 'Black T-shirt',
            price: 1000,
            category: 'T-shirt'
        });
    }));
});
//# sourceMappingURL=product.spec.js.map