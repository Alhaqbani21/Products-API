import express, { Request, Response, response } from 'express';

import { Product, ProductStore } from '../models/product';

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.delete('/products', deleteProduct);
  app.post('/products', createProduct);
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
  const productId = parseInt(_req.params.id);
  const product = await store.deleteProduct(productId);
  res.json(product);
};

const createProduct = async (_req: Request, res: Response) => {
  const product: Product = {
    name: _req.body.name,
    price: _req.body.price,
    category: _req.body.category,
  };
  const productCreated = await store.addProduct(product);
  res.json(productCreated);
};

export default productRoutes;
