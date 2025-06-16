import express from 'express';
import { login, logout } from '../controllers/authControllerManual';
import { googleAuthCallback, googleAuthRedirect } from '../controllers/authControllerGoogle';

const authRoutes = express.Router();

authRoutes.post('/login', login);
authRoutes.post('/logout', logout);
authRoutes.get('/google', googleAuthRedirect);
authRoutes.get('/google/callback', googleAuthCallback);

export default authRoutes;
