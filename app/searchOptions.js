var https = require("https");
var config = require("./config.js");
module.exports = searchRequest;

function searchRequest(db){

this.imageInfo = function(req, res) {
  var usersWord = req.params.searchTerm;
  var imgurData = {
    host: 'api.imgur.com',
  path: '/3/gallery/search/?q=' + encodeURIComponent(searchTerm),
  method: 'GET',
  headers: {
    'Authorization': config.clientKey
  }
};
  var imgReq = https.request(imgurData, function(imgRes){

    var apInfo = "";
    imgRes.setEncoding('utf8');
    imgRes.on('error', function(err){
      console.log("There was an Error loading data.");
      throw err;
    });

    imgRes.on('apInfo', function(data) {
      apInfo += data;
    });

    imgRes.on('end', function() {
      res.send(browserOutputInfo(req, apInfo));
      db.insert( { "term": searchTerm, "when": new Date() } );
    });
  });
};
//searches the mLab database for the 5 most recent searches
  this.recentHistory = function(res){
    db.find({}, {"_id": false, "expireAt": false })
    .sort({date: -1 })
    .limit(5)
    .toArray(function(err, history) {
      if (err) { throw err; }
      res.send(history);
    });
  };
}

//This function is used to parse, slice, sort and offset the data.
function browserOutputInfo(req, apInfo) {
  var jsonHistory = JSON.parse(apInfo);
  if(req.query.offset){
    var offset = Number(req.query.offset);
  }
  if(offset && typeof offset === "number") {
    var stringOutput = jsonHistory.apInfo.slice(0,offset);
    return searchParams(jsonHistory)
  }
  else { return searchParams(jsonHistory);}

  function searchParams(results){
    var outputJSON = [];

    for (var i = 0; i < results.length; i++) {
      var imageJSON = {
        title: results.title,
        				topic: results[i].topic,
                date: results[i].date,
        				description: results[i].description,
        				url: results[i].link
        			};
              outputJSON.push(imageJSON);
            }
            return outputJSON;
          }
  };
