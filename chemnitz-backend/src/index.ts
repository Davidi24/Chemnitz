import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { connectDB } from './config/db';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes';
import authRoute from './routes/authRoutes';
import featureRoute from './routes/featureRoute';

import { seedFeatures } from './utils/seedFeatures';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

async function startServer() {
  await connectDB();
  await seedFeatures();

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/api/user', userRoutes);
  app.use('/api/auth', authRoute);
  app.use('/feature', featureRoute);

  app.listen(5000, () => {
    console.log('Server running at http://localhost:5000');
    console.log('Swagger docs at http://localhost:5000/api-docs');
  });
}

startServer();
