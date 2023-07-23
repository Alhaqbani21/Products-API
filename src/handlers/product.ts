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
    const productId = parseInt(_req.params.id);
    const product = await store.show(productId);
    res.json(product);
};

const deleteProduct = async (_req: Request, res: Response) => {
    const productId = _req.params.id as unknown as number;
    if (!productId) {
        res.status(400);
        res.send('ID is missed');
        return false;
    }
    await store.deleteProduct(productId);
    res.send(`Product id: ${productId} was deleted successfully.`);
};

const createProduct = async (_req: Request, res: Response) => {
    const product: Product = {
        name: _req.body.name,
        price: _req.body.price,
        category: _req.body.category
    };

    if (!product.name || !product.price || !product.category) {
        res.status(400);
        res.send('Some information are missed');
        return false;
    }
    await store.addProduct(product);
    res.json({ product });
};

const updateProduct = async (_req: Request, res: Response) => {
    try {
        const id = _req.params.id as unknown as number;
        const name = _req.body.name as unknown as string;
        const price = _req.body.price as unknown as number;
        if (!name || !price || !id) {
            res.status(400);
            res.send('Some parameters are required ');
            return false;
        }
        const product: Product = await store.update(id, name, price);
    } catch (err) {
        res.status(400).json(err);
    }
};

export default productRoutes;
