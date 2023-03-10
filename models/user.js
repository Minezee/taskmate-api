const mongoose = require('mongoose');
const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1;
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const formattedToday = dd + '/' + mm + '/' + yyyy;

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: "white",
        required: true
    },
    createdAt: {
        type: String,
        default: formattedToday
    }
});

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    targets: [
        {
            name: {
                type: String,
                required: true
            },
            checked: {
                type: Boolean,
                default: false
            }
        }
    ],
    completed: {
        type: Boolean,
        default: false
    }
});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    notes: [noteSchema],
    todo: [todoSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);