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
const order_1 = require("../models/order");
const verify_1 = require("./verify");
const orderRoutes = (app) => {
    app.get('/orders', index);
    app.get('/orders/:id', verify_1.verifyUser, show);
    app.post('/orders/create', verify_1.verifyUser, create);
    app.delete('/orders/:id', verify_1.verifyUser, destroyOrder);
};
const store = new order_1.OrderStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield store.index();
    res.json(orders);
});
const show = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield store.show(_req.params.id);
    res.json(order);
});
const destroyOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400);
            res.send('id is not mentioned ');
            return false;
        }
        yield store.destroyOrder(id);
        res.send(`Order has been deleted successfully id: ${id}`);
    }
    catch (err) {
        res.status(400);
        res.json(`Error: ${err}`);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = req.body.products;
        const status = req.body.status;
        const user_id = req.body.user_id;
        if (!products || !status || !user_id) {
            res.status(400);
            res.send('products, status and user_id are missing ');
            return false;
        }
        const order = yield store.create({
            products,
            user_id,
            status
        });
        res.json(order);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
});
exports.default = orderRoutes;
//# sourceMappingURL=order.js.map