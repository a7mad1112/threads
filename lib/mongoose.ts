import mongoose from 'mongoose';

let isConnected = false;

/**
 * Connect to MongoDB and return the mongoose connection promise.
 * Throws if MONGO_DB_URL is not set so callers can fail fast.
 */
export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  const mongoUrl = process.env.MONGO_DB_URL;
  if (!mongoUrl) {
    // Throw so server actions / API routes fail fast in production instead of silently continuing
    throw new Error('Missing MongoDB URL (MONGO_DB_URL)');
  }

  if (isConnected) {
    console.log('MongoDB connection already established');
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(mongoUrl, {
      // recommended options can be added here if needed
    });
    isConnected = true;
    console.log('MongoDB connected');
    return conn;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};
