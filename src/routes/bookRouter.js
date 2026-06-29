import { Router } from 'express';
import { createBook } from '../controllers/BookControllers.js'

const BookRouter = Router();

//test route to check if the book router is working
BookRouter.get('/test', (req, res) => {
  res.status(200).json({ success: true, message: 'Book router is working' });
});

BookRouter.post('/', createBook);

export { BookRouter }