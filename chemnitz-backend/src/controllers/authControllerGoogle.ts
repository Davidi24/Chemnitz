import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { UserModel } from '../models/userModel';
import { setAccessTokenCookie } from "../utils/CookiesManager";

// Initialize the Google OAuth2 client
const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:5000/api/auth/google/callback' // Adjust this if using a different domain or port
);

// Redirects user to Google for authentication
export const googleAuthRedirect = (req: Request, res: Response): void => {
    const authUrl = client.generateAuthUrl({
        access_type: 'offline',
        scope: ['email', 'profile'],
    });
    res.redirect(authUrl);
};

export const googleAuthCallback = async (req: Request, res: Response): Promise<void> => {
    try {
        const { code } = req.query;
        if (!code) {
            res.status(400).json({ message: 'No authorization code provided' });
            return;
        }
        const { tokens } = await client.getToken(code as string);
        const idToken = tokens.id_token;
        const ticket = await client.verifyIdToken({
            idToken: idToken!,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload) {
            res.status(401).json({ message: 'Google authentication failed' });
            return;
        }

        let user = await UserModel.findOne({ email: payload.email });
        if (!user) {
            user = new UserModel({
                email: payload.email,
                username: payload.given_name,
                googleId: payload.sub,
                googleToken: tokens.access_token,
            });
            await user.save();
            console.log("User saved: ", user)
        }
        setAccessTokenCookie(user, res);
        res.redirect('http://localhost:3000');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
