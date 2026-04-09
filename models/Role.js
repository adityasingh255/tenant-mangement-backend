const mongoose = require('mongoose');
const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a role name'],
        unique: true,
        trim: true
    },
    permissions: [
        {
            type: String,
            required: true
        }
    ]
}, { timestamps: true });
module.exports = mongoose.model('Role', RoleSchema);