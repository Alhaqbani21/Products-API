import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserStore } from '../models/user';
import dotenv from 'dotenv';

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
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const newUser = await store.create(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(`${err} ${user}`);
  }
};

const authenticate = async (_req: Request, res: Response) => {
  const user: User = {
    username: _req.body.username,
    password: _req.body.password,
  };
  try {
    const u = await store.authenticate(user.username, user.password);
    if (u == null) {
      res.send('Invalid username or password');
    } else {
      res.send('Authenticated');
    }
    return;
  } catch (err) {
    res.status(401);
    res.json(`${err} `);
    return;
  }
};

const destroy = async (_req: Request, res: Response) => {
  const deleted = await store.delete(_req.body.id as string);
  res.json(deleted);
};

const update = async (req: Request, res: Response) => {
  const user: User = {
    id: req.params.id,
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    if (!token) {
      throw new Error('Authorization token is missing!');
    }
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as unknown as {
      id: string;
    };
    if (decoded.id !== user.id) {
      throw new Error('User id does not match!');
    }
    const updated = await store.create(user);
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(401);
    res.json(err);
    return;
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users', create);
  app.delete('/users', destroy);
  app.post('/users/authenticate', authenticate);
  app.put('/users/:id', update);
};
export default userRoutes;
