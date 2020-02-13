const express = require('express');
const router = express.Router();
const {login, logout} = require("./auth/index");
const {postUser, updateUser} = require("./users/index");
const Promise = require('bluebird');


function catchAsyncErrors(fn) {
    return (req, res, next) => {
        const routePromise = fn(req, res, next);
        if (routePromise.catch) {
            routePromise.catch(err => next(err));
        }
    };
}

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
