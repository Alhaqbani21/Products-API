import express, { Request, Response, response } from 'express';

import { Order, OrderStore, OrderProduct } from '../models/order';

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', create);
    app.post('/orders/:id/products', addProductToOrder);
};

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
    const orders = await store.index();
    res.json(orders);
};

const show = async (_req: Request, res: Response) => {
    const order = await store.show(_req.params.id);
    res.json(order);
};

const create = async (_req: Request, res: Response) => {
    const order: Order = {
        userId: _req.body.userId,
        status: 'active'
    };

    try {
        const newOrder = await store.create(order);
        res.json(newOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export async function addProductToOrder(req: Request, res: Response) {
    const { id } = req.params; // Extract order ID from the request parameters

    const orderProduct: OrderProduct = {
        order_id: parseInt(id),
        product_id: req.body.product_id,
        quantity: req.body.quantity
    };
    try {
        // Call the addProductToOrder function to add the product to the order
        const order = await store.addProductToOrder(orderProduct);

        // Respond with the updated order
        return res.json(order);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export default orderRoutes;
