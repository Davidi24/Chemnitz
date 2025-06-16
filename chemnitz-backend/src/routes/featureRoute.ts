// routes/authRoutes.js

import express from 'express';

import { getFeaturesByCategory } from '../controllers/FeatureController';
const featureRoute = express.Router();

featureRoute.get('/category/:categoryId', getFeaturesByCategory);

export default featureRoute;

