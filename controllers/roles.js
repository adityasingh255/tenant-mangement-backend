const ErrorResponse = require('../utils/errorResponse');
const Role = require('../models/Role');
const User = require('../models/User');
exports.getRoles = async (req, res, next) => {
    try {
        const roles = await Role.aggregate([{ $sort: { name: 1 } }]);
        res.status(200).json({ success: true, data: roles });
    } catch (err) {
        next(err);
    }
};
exports.createRole = async (req, res, next) => {
    try {
        const role = await Role.create(req.body);
        res.status(201).json({ success: true, data: role });
    } catch (err) {
        next(err);
    }
};
exports.updateRole = async (req, res, next) => {
    try {
        let role = await Role.findById(req.params.id);
        if (!role) return next(new ErrorResponse('Role not found', 404));
        role = await Role.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ success: true, data: role });
    } catch (err) {
        next(err);
    }
};
exports.deleteRole = async (req, res, next) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) return next(new ErrorResponse('Role not found', 404));
        const assignedUsers = await User.aggregate([
            { $match: { role: new (require('mongoose').Types.ObjectId)(req.params.id) } },
            { $count: "count" }
        ]);
        if (assignedUsers.length > 0) {
            return next(new ErrorResponse('Cannot delete role assigned to users', 400));
        }
        await role.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};