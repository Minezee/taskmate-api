const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validasi input
        if (!email || !password) {
            return res.status(400).json({ msg: 'Harap isi seluruh field' });
        }

        //cek email ada di database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Email atau password salah' });
        }

        //cek password sesuai
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Password salah' });
        }

        //buat token
        const token = jwt.sign({ id: user._id }, 'secret_key');

        //kadaluarsa token
        res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        //validasi input
        if (!email || !password || !name) {
            return res.status(400).json({ msg: 'Harap isi seluruh field' });
        }

        //cek email yang sudah terdaftar
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Email sudah ada' });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        //save to db
        const savedUser = await newUser.save();

        //create token
        const token = jwt.sign({ id: savedUser._id }, 'secret_key');

        res.json({
            token,
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.logout = (res) => {
    res.clearCookie('token').json({ msg: 'Logged out' });
};