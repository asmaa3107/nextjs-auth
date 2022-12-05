import { MongoClient } from 'mongodb';
export async function connectToDatabase() {
   // todo : connect db
  const client = await MongoClient.connect(
    'mongodb+srv://root:1234@cluster0.jgmnquw.mongodb.net/auth-demo?retryWrites=true&w=majority'
  );
  return client;
}
