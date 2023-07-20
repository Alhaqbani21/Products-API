import express, { Request, Response } from 'express';
import { Book, BookStore } from '../models/book';

const store = new BookStore();

const index = async (_req: Request, res: Response) => {
  const books = await store.index();
  res.json(books);
};

const show = async (_req: Request, res: Response) => {
  const book = await store.show(_req.params.id);
  res.json(book);
};

const create = async (_req: Request, res: Response) => {
  try {
    const book: Book = {
      id: _req.body.id,
      title: _req.body.title,
      author: _req.body.author,
      total_pages: _req.body.total_pages,
      summary: _req.body.summary,
    };

    const newBook = await store.create(book);
    res.json(newBook);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (_req: Request, res: Response) => {
  try {
    const deleted = await store.delete(_req.body.id);
    res.json(deleted);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

const articleRoutes = (app: express.Application) => {
  app.get('/books', index);
  app.get('/books/:id', show);
  app.post('/books', create);
  app.delete('/books', destroy);
};

export default articleRoutes;
