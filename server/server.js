import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();


app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}));

app.get('/', (req, res) => {
  res.send('Hello Welcome to the MERN Auth Server');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 

