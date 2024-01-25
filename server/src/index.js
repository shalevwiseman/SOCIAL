// importing libraries
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRouter = require('./routes/user.js');
const authRouter = require('./routes/auth.js');
const postsRouter = require('./routes/posts.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const allowedOrigins = ['http://localhost:3000']; // Update with your React client's actual origin


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
    .catch(err => console.log(`Could not connect to MongoDB...${err}`));

// middlewares
// app.use(cors()); // cross origin resource sharing
app.use(helmet()); // security
app.use(limiter); // rate limiting
app.use(morgan('tiny')); // logging
app.use(express.json()); // body parsing
// Initialize Passport
app.use(passport.initialize());

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
  );
// When a POST request is made to '/api/register', it will be handled by the router logic defined in user.js.
// This helps in organizing your code and separating concerns related to user registration from other parts of your application.
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => 
    console.log(`Listening on port ${PORT}...`)
);