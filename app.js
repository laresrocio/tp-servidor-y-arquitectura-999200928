import express from 'express';
import { connectToMongoDB } from './src/config/mongoDbConnection.js';
import { AuthRouter } from './src/routes/authRouter.js';
import { BookRouter } from './src/routes/bookRouter.js';
import cors from 'cors';
import { config } from 'dotenv';

config();

process.loadEnvFile()
connectToMongoDB()
const server = express();
server.use(express.json())
server.use(cors());

const environment = "dev"
let PORT = 3001
if (environment === "dev") {
  PORT = process.env.PORT
}
console.log(process.env.URI_DB)

// route to check if the server is running
server.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

//route for registering a new user and login
server.use("/mylibrary/auth", AuthRouter)
//route for book management
server.use("/mylibrary/books", BookRouter)

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})

export { server } 