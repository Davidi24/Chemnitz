import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { connectDB } from './config/db';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes';
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(express.json());
app.use(cookieParser());
connectDB();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);


app.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
  console.log('Swagger docs at http://localhost:5000/api-docs');
});
