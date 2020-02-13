const express = require('express');
const router = express.Router();
const {login, logout} = require("./auth/index");
const {postUser, updateUser} = require("./users/index");
const {catchAsyncErrors} = require("../helper/catch-async-errors");

// Home page route.
router.get('/', function (req, res) {
    res.end("home")
});

// About page route.
router.post('/login', catchAsyncErrors(login));
router.post('/logout', catchAsyncErrors(logout));

router.post('/users', catchAsyncErrors(postUser));
router.put('/users', catchAsyncErrors(updateUser));

module.exports = router;
