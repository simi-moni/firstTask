var pg = require('pg');
var config = {
  user: 'me',
  host: 'localhost',
  database: 'task',
  password: 'myPass',
  port: 5432,
};

const pool = new pg.Pool(config)

const insert = (data) => {
  const values = [data.name, data.comment];
  pool.query('INSERT INTO names(name, comment) VALUES($1, $2) RETURNING *', values, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0])
    }
  })
}

const addUser = (data) => {
  const values = [data.username, data.password];
  console.log(`>>> ${values}`)
  pool.query('INSERT INTO users("NAME", "PASSWORD") VALUES($1, $2) RETURNING *', values, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0])
    }
  })
}


const getUsers = (done) => {
  pool.query('SELECT * FROM users ', (err, result) => {
    if (err) {
      done(err);
    }
    done(null, result.rows)
  })
}


const getUser = (name, done) => {
  pool.query('SELECT * FROM users WHERE "NAME"=$1', [name], (err, result) => {
    if (err) {
      console.log(err);
      return done(err)
    }
    console.log(result.rows[0])
    done(null, result.rows[0])
  })
}

const findById = (id, done) => {
  pool.query('SELECT * FROM users WHERE "ID"=$1', [id], (err, result) => {
    if (err) return done(err);
    done(null, result.rows[0])
  })
}

module.exports = { insert, addUser, getUsers, getUser, findById}