//PLEASE READ!!!
//In order for this application to work you will need to connect your own
//mongodb/mLab information.
//Note that within searchOptions.js you will see "config.clientKey" which was a connection to my CLIENT-ID

var express = require("express");
var routes = require("./app/indx.js");
var mongo = require("mongodb").MongoClient;

var mongoURI = process.env.Mongo_URI ||'mongodb://localhost:27017/imagesearch';
var app = express();

app.use("/", express.static(process.cwd() + '/public'));
mongo.connect(mongoURI, function(err, db) {
  if(err) {throw new Error('Database failed to connect!');}
  db = db.collection("searchHistory");

  routes(app, db);

  var port = process.env.PORT || 3000;
  app.listen(port, function() {
    console.log("server.js listening on port " + port + "...");
  });
});
