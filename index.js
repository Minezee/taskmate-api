require('./db')
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors({
    origin: req.headers.origin,
    credentials: true,
    allowedHeaders: ['Access-Control-Allow-Origin','Content-Type','Authorization']
}));

app.use(bodyParser.json())
app.use('/auth', authRoutes);
app.use(bodyParser.json())
app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

