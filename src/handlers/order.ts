import express, { Request, Response, response } from 'express';

import { Order, OrderStore, OrderProduct } from '../models/order';
import { verifyUser } from './verify';

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/orders/:id', verifyUser, show);
    app.post('/orders/create', verifyUser, create);
    app.delete('/orders/:id', verifyUser, destroyOrder);
};

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
    const orders = await store.index();
    res.json(orders);
};

const show = async (_req: Request, res: Response) => {
    const id = _req.params.id as unknown as number;
    const order = await store.show(id);
    res.json(order);
};
const destroyOrder = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as unknown as number;
        if (!id) {
            res.status(400);
            res.send('id is not mentioned ');
            return false;
        }
        await store.destroyOrder(id);
        res.send(`Order has been deleted successfully id: ${id}`);
    } catch (err) {
        res.status(400);
        res.json(`Error: ${err}`);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const products = req.body.products as unknown as OrderProduct[];
        const status = req.body.status as unknown as string;
        const user_id = req.body.user_id as unknown as number;

        if (!products || !status || !user_id) {
            res.status(400);
            res.send('products, status and user_id are missing ');
            return false;
        }

        const order: Order = await store.create({
            products,
            user_id,
            status
        });

        res.json(order);
    } catch (e) {
        res.status(400);
        res.json(e);
    }
};

export default orderRoutes;
