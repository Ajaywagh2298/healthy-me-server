const process = require('process');
const env = process.env.HOST_ENV || 'development'; 
require('dotenv').config();

const hostConfig = require('../config/envConfig').serviceConfig[env];

module.exports = {
    generateToken : async (user) => {
        return jwt.sign({ id: user.id, email: user.email }, hostConfig.SECRET_KEY);
    }, 
    authenticateToken : async (req, res, next) => {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) return res.status(401).send('Access denied. No token provided.');
    
        jwt.verify(token, hostConfig.SECRET_KEY, (err, user) => {
            if (err) return res.status(403).send('Invalid token.');
            req.user = user;
            next();
        });
    }
}