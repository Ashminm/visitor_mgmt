const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    aadhaar: {
        type: String
    },
    phone: {
        type: String,
        required: true
    },
    othernumber: {
        type: Number
    },
    gender: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    purposeVisit: [
        {
            purpose: { type: String, required: true }
        }
    ],
    address: {
        type: String,
        required: true
    },
    arrivedtime: [
        {
            time: { type: String, required: true }
        }
    ],
    despachtime: [
        {
            time: { type: String }
        }
    ],
    currentdate: [
        {
            date: { type: String, required: true }
        }
    ],
    support: [
        {
            support: { type: String, required: true }
        }
    ],
    image: {
        type: String
    },
    numberofstay: [
        {
            number: { type: String }
        }
    ],
    attender: [
        {
            attender: { type: String, required: true }
        }
    ],
    status: {
        type: String,
        required: true
    },
    remarks: [
        {
            remark: { type: String, required: true }
        }
    ],
    userId: {
        type: String,
        required: true
    }
});

const visitors = mongoose.model('visitors', visitorSchema);
module.exports = visitors;
