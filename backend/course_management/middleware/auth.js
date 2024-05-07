const jwt = require('jsonwebtoken');
const config = require('../config');

const authenticateUser = async (req, res, next) => {
    // Verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, config.jwtSecret);

        // Find the user and attach their ID to the request object
        const user = await User.findOne({ _id }).select('_id');
        req.user_id = user._id; // Attach the user ID to the request object

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Invalid authorization token' });
    }
};

module.exports = authenticateUser;
