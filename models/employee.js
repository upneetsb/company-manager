const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employee_schema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    upvotes: {
        type: Number,
        required: true
    },
    downvotes: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Employee = mongoose.model('Employee', employee_schema);

module.exports = Employee;