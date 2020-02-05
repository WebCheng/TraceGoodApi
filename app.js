var express = require('express');
var app = express();
var routes = require('./src/routes/index');

app.use(express.static('public'));
app.use(express.json());
app.use(routes);

const server = app.listen(8080, function () {
    let port = server.address().port;
    console.log("Example app listening at http://localhost:%s", port);
});

