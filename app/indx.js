//Path to reach search options.
var path = process.cwd();
var searchRequest = require(path + '/app/searchOptions.js')
//setup for accessibility from other files
module.exports = function (app, db){
var searchFor = new searchRequest(db);
//route to set the homepage
app.route('/')
  .get(function (req, res) {
    res.sendFile(path + "/public/home.html");
  });
//route to set the searchHistory
app.route('/api/latest/imagesearch')
  .get(function (req, res) {
    searchFor.recentHistory(res);
  });
//route to set the searchTerm given by user
app.route('/api/imagesearch/:searchTerm')
  .get(function (req, res) {
    searchFor.imageInfo(req, res);
  });

 }
