require('./db')
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const noteRoutes = require('./routes/notes');
const todoRoutes = require('./routes/todo');
const bodyParser = require('body-parser');
const PORT = 5000;
const cors = require('cors');
const whitelist = ['http://localhost:3000', 'https://taskmates.vercel.app', 'https://taskmate-bccfreepass.vercel.app'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    allowedHeaders: ['Access-Control-Allow-Origin','Content-Type','Authorization']
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/notes', noteRoutes);
app.use('/todo', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

