const axios = require('axios');
exports.getTimeZones = async (req, res, next) => {
    try {
        try {
            const response = await axios.get('http://worldtimeapi.org/api/timezone');
            return res.status(200).json({
                success: true,
                data: response.data
            });
        } catch (error) {
            const commonTimeZones = [
                "UTC", "America/New_York", "America/Los_Angeles", 
                "Europe/London", "Europe/Paris", "Asia/Tokyo", 
                "Asia/Kolkata", "Australia/Sydney"
            ];
            return res.status(200).json({
                success: true,
                data: commonTimeZones
            });
        }
    } catch (err) {
        next(err);
    }
};