const config = require('../../../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashSalt = (msg, saltRounds = 10) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(msg, salt);
};

const createToken = (w, expiresIn = '24h') => {
    return jwt.sign({w}, config.secret, {
        expiresIn: expiresIn,
    });
};

const authorization = async function (req, res, next) {
    let authStr = req.headers['x-access-token'] || req.headers['authorization'];
    const bearers = authStr.split(' ');
    if (bearers.length < 2)
        return res.status(400).send('uth token is not supplied as in `bearer [TOKEN]');

    jwt.verify(bearers[1], config.secret, (err, decoded) => {
        if (err)
            return res.status(401).send('Token is not valid');
        req.decoded = decoded;
        next();
    });
};

module.exports = {
    hashSalt,
    createToken,
    authorization
};
