import express, { Request, Response, response } from 'express';

import { Product, ProductStore } from '../models/product';
import { verifyUser } from './verify';

const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.delete('/products/:id', verifyUser, deleteProduct);
    app.post('/products/create', verifyUser, createProduct);
    app.put('/products/:id', verifyUser, updateProduct);
};

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    const products = await store.index();
    res.json(products);
};

const show = async (_req: Request, res: Response) => {
    try {
        const id = _req.params.id as unknown as number;

        if (!id) {
            res.status(400);
            res.send('Missing id !! ');
            return false;
        }

        const product: Product | null = await store.show(id);
        if (!product) {
            res.status(404);
            res.send('Product not found');
            return;
        }
        res.json(product);
    } catch (err) {
        res.status(400).json(err);
    }
};

const deleteProduct = async (_req: Request, res: Response) => {
    const id = _req.params.id as unknown as number;
    if (!id) {
        res.status(400);
        res.send('ID is missed');
        return false;
    }
    await store.deleteProduct(id);
    res.send(`Product id: ${id} was deleted successfully.`);
};

const createProduct = async (_req: Request, res: Response) => {
    const name = _req.body.name as unknown as string;
    const price = _req.body.price as unknown as number;
    const category = _req.body.name as unknown as string;
    if (!name || !price || !category) {
        res.status(400);
        res.send('Some information are missed');
        return false;
    }
    const product: Product = await store.addProduct({ name, price, category });
    res.json({ product });
};

const updateProduct = async (_req: Request, res: Response) => {
    try {
        const id = _req.params.id as unknown as number;
        const name = _req.body.name as unknown as string;
        const price = _req.body.price as unknown as number;
        const category = _req.body.category as unknown as string;

        if (!name || !price || !id || !category) {
            res.status(400);
            res.send('Some parameters are required');
            return;
        }

        const product: Product = await store.update(id, {
            name,
            price,
            category
        });

        if (!product) {
            res.status(404);
            res.send('Product not found');
            return;
        }

        res.json(product);
    } catch (err) {
        res.status(400).json(err);
    }
};

export default productRoutes;
