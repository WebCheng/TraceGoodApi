const config = require('../../config');
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

const verifiedToken = (token) => {

    jwt.verify(token, config.secret, async function handle(err, decoded) {
        if (err) return [true, ""];
    });
    return [true, ""]
};

const authorization = async function (req, res, next) {
    let authStr = req.headers['x-access-token'] || req.headers['authorization'];
    const bearers = authStr.split(' ');
    if (bearers.length < 2)
        return setRespondMsg(
            res,
            400,
            'Auth token is not supplied as in `bearer [TOKEN]`'
        ).end();
    verifiedToken(req, res, bearers[1])
};

const isauth = async (req, res, next) => {
    res.send('logout!!');
};

module.exports = {
    hashSalt,
    createToken,
    verifiedToken,
    authorization
};
