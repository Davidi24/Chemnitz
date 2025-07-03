import express from 'express';
import { login, logout } from '../controllers/authControllerManual';
import { googleAuthCallback, googleAuthRedirect } from '../controllers/authControllerGoogle';
import { authenticateJWT } from '../middlewares/authenticateUser';
const authRoutes = express.Router();

authRoutes.post('/login', login);
authRoutes.post('/logout',authenticateJWT, logout);
authRoutes.get('/google', googleAuthRedirect);
authRoutes.get('/google/callback', googleAuthCallback);

export default authRoutes;
