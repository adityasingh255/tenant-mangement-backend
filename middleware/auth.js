const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return next(new ErrorResponse('Not authorized', 401));
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).populate('role');
        next();
    } catch (err) {
        return next(new ErrorResponse('Not authorized', 401));
    }
};
exports.authorize = (...requiredPermissions) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return next(new ErrorResponse('User role not found', 403));
        }
        const hasPermission = req.user.role.permissions.some(p => 
            requiredPermissions.includes(p) || p === 'all'
        );
        if (!hasPermission) {
            return next(new ErrorResponse(`User does not have required permissions`, 403));
        }
        next();
    };
};