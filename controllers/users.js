const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const mongoose = require('mongoose');
exports.getUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;
        const search = req.query.search || '';
        const pipeline = [];
        if (search) {
            pipeline.push({
                $match: {
                    $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } }
                    ]
                }
            });
        }
        pipeline.push({
            $lookup: {
                from: 'roles',
                localField: 'role',
                foreignField: '_id',
                as: 'role'
            }
        }, {
            $unwind: { path: '$role', preserveNullAndEmptyArrays: true }
        }, {
            $lookup: {
                from: 'sites',
                localField: 'site',
                foreignField: '_id',
                as: 'site'
            }
        }, {
            $unwind: { path: '$site', preserveNullAndEmptyArrays: true }
        });
        pipeline.push({ $sort: { createdAt: -1 } });
        pipeline.push({
            $facet: {
                metadata: [{ $count: 'total' }],
                data: [{ $skip: skip }, { $limit: limit }]
            }
        });
        const results = await User.aggregate(pipeline);
        const users = results[0].data;
        const total = results[0].metadata[0]?.total || 0;
        const pagination = {};
        if (skip + users.length < total) pagination.next = { page: page + 1, limit };
        if (skip > 0) pagination.prev = { page: page - 1, limit };
        res.status(200).json({
            success: true,
            count: users.length,
            pagination,
            total,
            data: users
        });
    } catch (err) {
        next(err);
    }
};
exports.createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};
exports.updateUser = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) return next(new ErrorResponse('User not found', 404));
        user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return next(new ErrorResponse('User not found', 404));
        await user.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};