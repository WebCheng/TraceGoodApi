const User = require('../../models/users');
const {hashSalt} = require('../../middleware/auth/index');
const {login} = require('../auth/index');

const postUser = async (req, res) => {
    const {email, password, firstName, lastName} = req.body;
    //If data is not found then insert
    const newUser = await User.findOneAndUpdate(
        {email},
        {
            $setOnInsert: {
                password: hashSalt(password),
                firstName,
                lastName,
            },
        },
        {upsert: true, new: true, rawResult: true}
    );

    if (newUser.lastErrorObject.updatedExisting === true)
        return res.status(409).json('The account is exist!!');

    login(req, res);
};

const updateUser = async (req, res) => {
    res.send('updateUser!!');
};

module.exports = {
    postUser,
    updateUser
};
