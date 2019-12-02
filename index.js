var express = require('express');
var path = require('path');
var db = require('./connection');
var control = require('./controllers');
var port = 8080;
var app = express();
app.use( express.json() );       
app.use(express.urlencoded({     
  extended: true
})); 

app.get('/', (req,res)=>res.sendFile(path.join(__dirname + '/index.html')));

app.post('/submit-form', function(req,res){
    db.insert(req.body);
    res.status(201).end("success");
});

/*app.get('/:id', (req,res,next)=>{
  db.query('SELECT * FROM names WHERE id = $1', (err, res) => {
    if(err){
      return next(err)
    }
    res.status(200).json(res.rows)
  })
})
*/
app.get('/all', (req, res)=>{
  db.getUsers(req,res);
})

app.get('/:id', (req, res)=>{
  db.getUser(req.params,res)
  res.status(200);
})

app.listen(port, ()=> {
    console.log('App running on port: ' + port );
});