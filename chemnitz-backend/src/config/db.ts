import mongoose from 'mongoose';
const MONGO_URI = process.env.MONGO_URI;
console.log(process.env.MONGO_URI)

export async function connectDB(): Promise<void> {
    try {
        if (!MONGO_URI) {
            console.error('Please provide the Mongo URI');
            process.exit(1);
        }
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}
