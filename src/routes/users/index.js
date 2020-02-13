const User = require('../../models/users');
const {hashSalt, createToken} = require('../../auth/index');

const postUser = async (req, res) => {
    const {email, password, firstName, lastName, qq} = req.body;
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

    res.status(200).json({emai: email, token: createToken(email)});
};

const updateUser = async (req, res) => {
    res.send('updateUser!!');
};

module.exports = {
    postUser,
    updateUser
};
