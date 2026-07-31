import express from 'express';
import dotenv from 'dotenv';
import router from './routes/routes.js';
import cors from 'cors';
import { PrismaClient } from './generated/prisma/client.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

dotenv.config();

const app = express();
// Allow requests from React/Vite
app.use(
   cors({
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
   })
);
app.use(express.json());
app.use('/api', router);

const port = process.env.PORT || 3000;

const adapter = new PrismaMariaDb({
   host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  connectionLimit: 5,
});
export const prisma = new PrismaClient({ adapter });

async function startServer() {
   try {
      // Test the database connection
      await prisma.$connect();
      console.log('✅ Database connected successfully.');

      app.listen(port, () => {
         console.log(`Server is running on http://localhost:${port}`);
      });
   } catch (error) {
      console.error('❌ Failed to connect to the database.');
      console.error(error);
      process.exit(1); // Stop the server if DB connection fails
   }
}

startServer();
