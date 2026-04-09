const ErrorResponse = require('../utils/errorResponse');
const Site = require('../models/Site');
const User = require('../models/User');
const mongoose = require('mongoose');
exports.getSites = async (req, res, next) => {
    try {
        const sites = await Site.aggregate([{ $sort: { name: 1 } }]);
        res.status(200).json({ success: true, data: sites });
    } catch (err) {
        next(err);
    }
};
exports.createSite = async (req, res, next) => {
    try {
        const site = await Site.create(req.body);
        res.status(201).json({ success: true, data: site });
    } catch (err) {
        next(err);
    }
};
exports.updateSite = async (req, res, next) => {
    try {
        let site = await Site.findById(req.params.id);
        if (!site) return next(new ErrorResponse('Site not found', 404));
        site = await Site.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ success: true, data: site });
    } catch (err) {
        next(err);
    }
};
exports.deleteSite = async (req, res, next) => {
    try {
        const site = await Site.findById(req.params.id);
        if (!site) return next(new ErrorResponse('Site not found', 404));
        const assignedUsers = await User.aggregate([
            { $match: { site: new mongoose.Types.ObjectId(req.params.id) } },
            { $count: "count" }
        ]);
        if (assignedUsers.length > 0) {
            return next(new ErrorResponse('Cannot delete site with assigned users', 400));
        }
        await site.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};