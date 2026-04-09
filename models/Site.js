const mongoose = require('mongoose');
const SiteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a site name'],
        unique: true,
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    },
    timezone: {
        type: String,
        default: 'UTC'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, { timestamps: true });
module.exports = mongoose.model('Site', SiteSchema);