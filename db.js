require('dotenv').config()
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const mongoUrl = process.env.MONGO_URL
mongoose.connect(mongoUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);