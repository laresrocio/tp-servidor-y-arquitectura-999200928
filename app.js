import express from 'express';
import config from 'dotenv';
config();

process.loadEnvFile()

const server = express();
server.use(express.json())
server.use(cors());

const environment = "dev"
let PORT = 3001
if (environment === "dev") {
  PORT = process.env.PORT
}
// route to check if the server is running
server.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
