const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    page: {
        type: String,
        required: true,
        unique: true
    },
    count: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Visit', visitSchema);
