import { Router } from 'express';
import { registerUser } from '../controllers/authControllers.js'

const AuthRouter = Router();

//test route to check if the auth router is working
AuthRouter.get('/test', (req, res) => {
  res.status(200).json({ success: true, message: 'Auth router is working' });
});

AuthRouter.post('/register', registerUser);

export { AuthRouter }