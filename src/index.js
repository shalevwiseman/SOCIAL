// importing libraries
import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import morgan from 'morgan';
import mongoose from 'mongoose';
import User from './routes/user.js';

const limiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // include all the standart headers
    legacyHeaders: false // disable X-*, X-Forwarded-* headers
});

const app = express();

// connecting to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...${err}'));

// middlewares
app.use(cors()); // cross origin resource sharing
app.use(helmet()); // security
app.use(limiter); // rate limiting
app.use(morgan('tiny')); // logging
app.use(express.json()); // body parsing

// When a POST request is made to '/api/register', it will be handled by the router logic defined in user.js.
// This helps in organizing your code and separating concerns related to user registration from other parts of your application.
app.use('/api/user', User)

const port = process.env.PORT || 3000;
app.listen(port, () => 
    console.log(`Listening on port ${port}...`)
);