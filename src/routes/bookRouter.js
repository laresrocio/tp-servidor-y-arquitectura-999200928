import { Router } from 'express';
import { createBook, editBook, getAllBooks, getBookById, deleteBook } from '../controllers/BookControllers.js'

const BookRouter = Router();

//test route to check if the book router is working
BookRouter.get('/test', (req, res) => {
  res.status(200).json({ success: true, message: 'Book router is working' });
});

BookRouter.post('/', createBook);
BookRouter.patch('/:id', editBook);
BookRouter.get('/', getAllBooks);
BookRouter.get('/:id', getBookById);
BookRouter.delete('/:id', deleteBook);

export { BookRouter }