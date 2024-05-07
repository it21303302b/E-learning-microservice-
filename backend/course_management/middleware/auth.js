const jwt = require("jsonwebtoken");
const config = require('../config');

function authenticateUser(req, res, next) {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization token not found.' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer {token}"

    if (!token) {
        return res.status(401).json({ error: 'Authorization token not found.' });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid authorization token.' });
    }
}

module.exports = {
    authenticateUser,
};
