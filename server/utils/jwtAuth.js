const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtAuthenticate = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'Token not found' });

    const token = auth.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decode = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
        req.user = decode;
        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({ error: 'Invalid token' });
    }
};

const jwtGenerate = (userData) => {
    return jwt.sign(userData, process.env.ACCESS_SECRET_KEY, { expiresIn: process.env.ACCESS_SECRET_KEY_EXPIRY });
};

module.exports = { jwtAuthenticate, jwtGenerate };
