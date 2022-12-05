import { connectToDatabase } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';
async function handler(req,res){
//todo: check if email and password are valid 
  if(req.method !== 'POST'){
    return;
  }
  const data = req.body;
  const {email, password} = data;
      if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        'Invalid Email or Password - password should also be at least 7 characters long.',
    });
    return;
  }
//todo: 1- Connect to database 
    const client = await connectToDatabase();
    const db =client.db();

//todo: 2- store our user data in users collection
    const hashedPassword = await hashPassword(password);
    const user = await db.collection('users').insertOne({
          email: email,
          password: hashedPassword,
        });

//todo: create user and close connection   
    res.status(201).json({ message: 'Created user created successfully!' });
    client.close();
}

export default handler;