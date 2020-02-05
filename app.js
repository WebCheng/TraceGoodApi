var express = require('express');
var app = express();
var routes = require('./src/routes/index');

app.use(express.static('public'));
app.use(express.json());
app.use(routes);


const server = app.listen(8080, function () {

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://root:password@localhost:27017/";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.createCollection("customers", function(err, res) {
            if (err) throw err;
            console.log("Collection created!");
            db.close();
        });
    });

    console.log("Example app listening ");
    let port = server.address().port;
    console.log("Example app listening at http://localhost:%s", port);
});

