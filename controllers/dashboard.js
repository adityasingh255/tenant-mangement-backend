const User = require('../models/User');
const Role = require('../models/Role');
const Site = require('../models/Site');
exports.getStats = async (req, res, next) => {
    try {
        const userStats = await User.aggregate([
            {
                $facet: {
                    total: [{ $count: "count" }],
                    active: [
                        { $match: { status: 'active' } },
                        { $count: "count" }
                    ]
                }
            }
        ]);
        const totalRoles = await Role.aggregate([{ $count: "count" }]);
        const totalSites = await Site.aggregate([{ $count: "count" }]);
        res.status(200).json({
            success: true,
            data: {
                totalUsers: userStats[0].total[0]?.count || 0,
                activeUsers: userStats[0].active[0]?.count || 0,
                totalRoles: totalRoles[0]?.count || 0,
                totalSites: totalSites[0]?.count || 0
            }
        });
    } catch (err) {
        next(err);
    }
};