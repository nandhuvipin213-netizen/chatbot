import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gemini-chatbot';
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error: any) {
    console.warn(`⚠️ MongoDB connection notice: ${error.message}. Running in resilient mode.`);
  }
};

