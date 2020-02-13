const User = require('../../models/users');
const bcrypt = require('bcrypt');
const {createToken} = require("../../middleware/auth");

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if (user === null)
        return res.status(409).send("User not Found!!");

    bcrypt.compare(password, user.password, (err, match) => {
        if (err)
            return res.status(409).send(err);

        if (match)
            return res.status(200).json({emai: email, token: createToken(email)});
        else
            return res.status(409).send('Password does not match');
    });
};

const logout = async (req, res) => {
    res.send('logout!!');
};

module.exports = {
    login,
    logout
};
