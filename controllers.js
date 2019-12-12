const express = require('express');
const path = require('path');
const db = require('./connection');
const app = express();
app.use(express.json() );       
app.use(express.urlencoded({     
  extended: false
})); 
const  {check, validationResult} = require('express-validator');


/*
app.post("/register",
    [check('name').isAlpha().trim(),
    check('password').notEmpty().trim()], (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    db.addUser(req.body);
})*/

