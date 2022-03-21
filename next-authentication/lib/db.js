import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://Thomas:G~4k.mLaY~gKP9e@cluster0.pnz7e.mongodb.net/authentication-demo?retryWrites=true&w=majority"
  );

  return client;
};
