import { Router } from 'express';

const BookRouter = Router();

//test route to check if the book router is working
BookRouter.get('/test', (req, res) => {
  res.status(200).json({ success: true, message: 'Book router is working' });
});

export { BookRouter }