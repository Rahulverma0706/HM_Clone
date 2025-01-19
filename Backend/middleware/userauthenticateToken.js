const jwt = require('jsonwebtoken');
const SECRET_KEY = 'hello2025';

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send({ error: 'Access denied' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
