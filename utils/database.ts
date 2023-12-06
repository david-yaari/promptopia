import mongoose, { ConnectOptions } from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    mongoose
      .connect(process.env.MONGODB_URI!, {
        dbName: 'share_prompt',
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((err) => {
        console.log(err);
      });

    isConnected = true;

    //console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
};
