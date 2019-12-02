var pg = require('pg');
var config = {
    user: 'me',
    host:'localhost', 
    database: 'task',
    password: 'myPass',
    port: 5432,
};

const pool = new pg.Pool(config)

    const insert =  (data)=>{
      const values = [data.name, data.comment];
      pool.query('INSERT INTO names(name, comment) VALUES($1, $2) RETURNING *', values, (err, res)=>
      {
          if(err){
              console.log(err.stack)
          } else{
              console.log(res.rows[0])
          }
      })
    }

  

 /* module.exports ={
    query: (sql, callback)=>{
      return pool.query(sql, callback)
    }
  }*/

  const getUsers = (req, res) =>
  {
    pool.connect();
    pool.query('SELECT * FROM names ', (err, result)=>
    {
    if(err){
      console.log(err);
    }
    res.json(result.rows)
    })
  }

  const getUser = (data, res)=>{
    pool.connect();
    const id = parseInt(data.id)
    pool.query('SELECT * FROM names WHERE id = $1', [id], (err, result)=>{
      if(err){
        console.log(err);
      }
      res.json(result.rows) 
    })
  }

  module.exports ={insert, getUsers, getUser}