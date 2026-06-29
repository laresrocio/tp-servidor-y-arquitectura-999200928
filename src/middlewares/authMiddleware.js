import jwt from 'jsonwebtoken'
import { config } from "dotenv"

config()

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  //cheek if the authorization header is present and starts with 'Bearer '
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  //extract the token from the header
  const token = header.split(' ')[1];

  try {
    //verify the token using the secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    //attach the decoded user information to the request object
    req.userLogged = decoded
    next();

  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
}


export { authMiddleware }
