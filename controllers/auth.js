const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return next(new ErrorResponse('Please provide an email and password', 400));
        const user = await User.findOne({ email }).select('+password').populate('role');
        if (!user || !(await user.matchPassword(password))) return next(new ErrorResponse('Invalid credentials', 401));
        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).populate('role site');
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role ? { name: user.role.name, permissions: user.role.permissions } : null
        }
    });
};