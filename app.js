const createError = require('http-errors')
const express = require('express');
const app = express();
const routes = require('./src/routes/index');
const mongoose = require('mongoose');
const config = require('./config');


mongoose.connection.on('error', err => {
    throw new Error(`unable to connect to database: ${config.mongodb.url}`)
});

mongoose.connection.once('open', () => {
    console.log(`connected to database: ${config.mongodb.url}`);
    app.db = mongoose.connection
});

mongoose.connect(config.mongodb.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});



app.use(express.static('public'));
app.use(express.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next()
});


app.use(routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).json({
        message: err.message,
        error: err,
    });
    console.log(err);
});

app.listen(config.server.port, () => {
    console.log(`server started at http://localhost:${config.server.port}`);
});

