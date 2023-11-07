import mongoose from 'mongoose';
let isConnected = false;
export const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  if (!process.env.MONGO_DB_URL) return console.log('Missing MongoDB URL');
  if (isConnected) return console.log('MongoDB connection already established');
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err)
  }
};
