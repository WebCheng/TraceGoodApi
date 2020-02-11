const express = require('express');
const router = express.Router();
const {login, logout} = require("./auth/index");
const {postUser, updateUser} = require("./users/index");

// Home page route.
router.get('/', function (req, res) {
    res.end("home")
});

// About page route.
router.post('/login', login);
router.post('/logout', logout);

router.post('/users', postUser);
router.put('/users', updateUser);

module.exports = router;
