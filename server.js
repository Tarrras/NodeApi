var express = require('express');

var app = express();

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

app.get('/', function(req, res){
  res.send('Hello api');
})

app.get('/cats', function(req, res){
  res.send(cats)
})

app.listen(3012, function(){
  console.log("API started");
})