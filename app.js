var express     = require('express'),
    bodyParser  = require("body-parser"),
    MongoClient = require('mongodb').MongoClient;

var MONGO_URL        = "mongodb://localhost:27017/",
    PORT             = 3000,
    DB_NAME          = 'Venom',
    COLLECTION_NAME  = 'Tweets',
    CURSOR_QUERY_OBJ = {};

var db,
    cursor,
    prevDocID;

app = express();
app.use(bodyParser.json());

// http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#mongoclient-connection-pooling
MongoClient.connect(MONGO_URL + DB_NAME, function(err, database) {
  if(err) throw err;

  db = database;
  cursor = db.collection(COLLECTION_NAME).find(CURSOR_QUERY_OBJ);

  app.listen(PORT);
  console.log("Listening on port " + PORT);
});


app.get("/", function(req, res) {
  cursor.nextObject(function (err, doc) {
    if (doc) {
      prevDocID = doc['_id'];
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

    updatePreviousObject(labelName, labelValue);

    cursor.nextObject(function (err, doc) {

      if (doc) {
        prevDocID = doc['_id'];
        res.end(doc['text']);

      } else {
        db.close();
        res.end("No Mas.");
      }
    })
});

function updatePreviousObject (labelName, labelValue) {
  if(labelName && prevDocID) {

    var updateObject = Object.create(null);
    updateObject[labelName] = labelValue;

    db.collection(COLLECTION_NAME).update(
      { _id: prevDocID }, 
      { $set: updateObject }, 
      function (err, result) { if (err) console.error(err); }
    );
  }
}
