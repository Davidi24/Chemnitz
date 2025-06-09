// routes/authRoutes.js

import express from 'express';
import {  login, logout } from '../controllers/authControllerManual';
import { googleAuthCallback, googleAuthRedirect } from '../controllers/authControllerGoogle';

const authRoute = express.Router();

authRoute.post('/login', login);
authRoute.post('/logout', logout);

authRoute.get('/google', googleAuthRedirect);  // Redirect to Google
authRoute.get('/google/callback', googleAuthCallback); 

export default authRoute;
