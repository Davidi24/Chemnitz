// routes/authRoutes.js

import express from 'express';

import { getFeaturesByCategory, getFeatureById, getFeaturesByFuzzyName } from "../controllers/FeatureController";
const featureRoute = express.Router();

featureRoute.get('/category/:field/:value', getFeaturesByCategory);
featureRoute.get('/id/:id', getFeatureById);
featureRoute.get('/fuzzy-name/:name', getFeaturesByFuzzyName);

export default featureRoute;

