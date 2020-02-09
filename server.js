var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var app = express();
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cats = [
  {
    id: 1,
    name: 'Barsik'
  },
  {
    id: 2,
    name: 'Kotik'
  },
  {
    id: 3,
    name: 'Murzik'
  },
]

// GET BY ID
app.get('/cats/:id', function(req, res){
  db.collection('cats').findOne({ _id: ObjectID(req.params.id)}, function(err, doc){
    if(err){
      console.log(err)
      return res.sendStatus(500);
    }
    res.send(doc);
  })
})

// POST NEW CAT
app.post('/cats',function(req, res){
  var cat = {
    name: req.body.name
  };
  db.collection('cats').insert(cat, function(err, result){
    if(err){
      console.log(err)
      return res.sendStatus(500);
    }
    res.send(cat)
  })
  // res.send(cat);
})

//UPDATE BY ID
app.put('/cats/:id', function(req,res){
  var cat = cats.find(function (cat){
    return cat.id === Number(req.params.id)
  });
  cat.name = req.body.name;
  res.sendStatus(200);
})


//GET ALL CATS
app.get('/cats', function(req, res){
  db.collection('cats').find().toArray(function(err, docs){
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs)
  })
})

//DELETE BY ID
app.delete('/cats/:id', function(req,res){
  cats = cats.filter(function (cat){
    return cat.id != Number(req.params.id)
  });
  res.sendStatus(200);
})



MongoClient.connect('mongodb://localhost/cats',{ useUnifiedTopology: true }, function(err, database){
  if(err){
    return console.log(err);
  }

  db = database.db('cats');
  app.listen(3000, function(){
  console.log("API started");
})
})