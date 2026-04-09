const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Role = require('./models/Role');
const Site = require('./models/Site');
const User = require('./models/User');
mongoose.connect(process.env.MONGODB_URI);
const importData = async () => {
    try {
        const roles = await Role.create([
            { name: 'Admin', permissions: ['all'] },
            { name: 'Manager', permissions: ['read', 'write'] },
            { name: 'User', permissions: ['read'] }
        ]);
        const site = await Site.create({
            name: 'Headquarters',
            location: 'New York, USA',
            status: 'active'
        });
        await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123',
            role: roles[0]._id,
            site: site._id,
            status: 'active'
        });
        console.log('Data Imported...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
const deleteData = async () => {
    try {
        await User.deleteMany();
        await Role.deleteMany();
        await Site.deleteMany();
        console.log('Data Destroyed...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}