import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserStore } from '../models/user';
import dotenv from 'dotenv';
import { verifyUser, getToken } from './verify';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  TOKEN_SECRET,
} = process.env;

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (_req: Request, res: Response) => {
  const user = await store.show(_req.params.id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  try {
    const firstname = req.body.firstname as unknown as string;
    const lastname = req.body.lastname as unknown as string;
    const username = req.body.username as unknown as string;
    const password = req.body.password as unknown as string;

    if (!firstname || !lastname || !username || !password) {
      res.status(400);
      res.send(
        'Some required parameters are missing! eg. :firstName, :lastName, :userName, :password'
      );
      return false;
    }
    const user: User = await store.create({
      firstname,
      lastname,
      username,
      password,
    });

    res.json(getToken(user));
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const username = req.body.username as unknown as string;
  const password = req.body.password as unknown as string;
  try {
    if (!username || !password) {
      res.status(400);
      res.send('username or password is wrong');
      return false;
    }
    const user: User | null = await store.authenticate(username, password);
    if (!user) {
      return res.status(401).send(`Wrong password ${username}.`);
    }
    res.json(getToken(user));
  } catch (err) {
    res.status(401);
    res.json(`${err} `);
    return;
  }
};

const destroy = async (_req: Request, res: Response) => {
  try {
    const id = _req.params.id as unknown as number;
    if (id == null) {
      res.status(400).send('Missing id as parameter.');
      return false;
    }
    await store.delete(id);
    res.send(`User id: ${id} , has been deleted successfully `);
  } catch (err) {
    res.status(400).json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const firstname = req.body.firstname as unknown as string;
    const lastname = req.body.lastname as unknown as string;
    if (!firstname || !lastname || !id) {
      res.status(400);
      res.send(
        'Some required parameters are missing! eg. :firstName, :lastName, :id'
      );
      return false;
    }
    const user: User = await store.update(id, {
      firstname,
      lastname,
    });
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users/create', create);
  app.delete('/users/:id', verifyUser, destroy);
  app.post('/users/authenticate', authenticate);
  app.put('/users/:id', verifyUser, update);
};
export default userRoutes;
