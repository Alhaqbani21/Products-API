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
const product_1 = require("../models/product");
const verify_1 = require("./verify");
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.delete('/products/:id', verify_1.verifyUser, deleteProduct);
    app.post('/products/create', verify_1.verifyUser, createProduct);
    app.put('/products/:id', verify_1.verifyUser, updateProduct);
};
const store = new product_1.ProductStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield store.index();
    res.json(products);
});
const show = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = parseInt(_req.params.id);
    const product = yield store.show(productId);
    res.json(product);
});
const deleteProduct = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = _req.params.id;
    if (!productId) {
        res.status(400);
        res.send('ID is missed');
        return false;
    }
    yield store.deleteProduct(productId);
    res.send(`Product id: ${productId} was deleted successfully.`);
});
const createProduct = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        name: _req.body.name,
        price: _req.body.price,
        category: _req.body.category
    };
    if (!product.name || !product.price || !product.category) {
        res.status(400);
        res.send('Some information are missed');
        return false;
    }
    yield store.addProduct(product);
    res.json({ product });
});
const updateProduct = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = _req.params.id;
        const name = _req.body.name;
        const price = _req.body.price;
        if (!name || !price || !id) {
            res.status(400);
            res.send('Some parameters are required ');
            return false;
        }
        const product = yield store.update(id, name, price);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
exports.default = productRoutes;
//# sourceMappingURL=product.js.map