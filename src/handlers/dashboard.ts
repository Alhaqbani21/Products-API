import express, { Request, Response, response } from 'express';

import { DashboardQueries } from '../services/dashboard';

const dashboardRoutes = (app: express.Application) => {
  app.get('/five-most-expensive', fiveMostExpensive);
  app.get('/products_in_orders', productsInOrders);
  app.get('/users-with-orders', usersWithOrders);
};

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
  const products = await dashboard.productsInOrders();
  res.json(products);
};

const usersWithOrders = async (_req: Request, res: Response) => {
  const users = await dashboard.usersWithOrders();
  res.json(users);
};

const fiveMostExpensive = async (_req: Request, res: Response) => {
  const users = await dashboard.fiveMostExpensive();
  res.json(users);
};

export default dashboardRoutes;
