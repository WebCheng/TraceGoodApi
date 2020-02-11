const {secret} = require("../../../config");
const User = require('../../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const postUser = async (req, res) => {
    try {
        const {email, password, firstName, lastName} = req.body;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        //If data is not found then insert
        let newUser = await User.findOneAndUpdate(
            {email},
            {
                $setOnInsert: {
                    password: hash,
                    firstName,
                    lastName,
                },
            },
            {upsert: true, new: true, rawResult: true}
        );

        if (newUser.lastErrorObject.updatedExisting !== true) {
            const token = jwt.sign({email}, secret, {
                expiresIn: '24h',
            });
            res.status(200).json({email, token})
        } else {
            res.status(409).send('The account is exist!!');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message})
    }
};

const updateUser = async (req, res) => {
    res.send('updateUser!!');
};

module.exports = {
    postUser,
    updateUser
};
