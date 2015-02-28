var express     = require('express'),
    bodyParser  = require("body-parser"),
    mongodb     = require('mongodb'),
    app         = express(),
    MongoClient = require('mongodb').MongoClient;

var db,
    cursor,
    previousDoc;

app.use(bodyParser.json());

MongoClient.connect("mongodb://localhost:27017/Venom", function(err, database) {
  if(err) throw err;

  db = database;
  cursor = db.collection('Tweets').find({});

  app.listen(3000);
  console.log("Listening on port 3000");
});


app.get("/", function(req, res) {
  cursor.nextObject(function (err, doc) {
    if (doc) {
      previousDoc = doc;
      res.end(doc['text']);
    } else {
      db.close();
      res.end("No Mas.");
    }
  })
});


app.post("/", function(req, res) {
  var labelName  = req.body['labelName'],
      labelValue = req.body['labelValue'];

    cursor.nextObject(function (err, doc) {
      var updateObject = Object.create(null);

      if (doc) {
        if(labelName && previousDoc) {
          updateObject[labelName] = labelValue;
          db.collection('Tweets').update(
            { _id:previousDoc['_id'] }, 
            { $set: updateObject }, 
            function (err, result) { if (err) console.error(err); }
          );
        }

        previousDoc = doc;
        res.end(doc['text']);

      } else {
        db.close();
        res.end("No Mas.");
      }
    })
});
