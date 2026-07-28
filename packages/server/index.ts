import express from 'express';
import dotenv from 'dotenv';
import router from './routes/routes.js';
import cors from 'cors';   
dotenv.config();

const app = express();
// Allow requests from React/Vite
app.use(
   cors({
      origin:  process.env.CLIENT_URL || 'http://localhost:5173',
   })
);
app.use(express.json());
app.use('/api', router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
