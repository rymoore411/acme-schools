const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const { Student, School} = db.models;

db.syncAndSeed();

const port = process.env.PORT || 3000;

app.listen(port, ()=>console.log(`listening on port ${port}`));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, './index.html')));

app.get('/api/students', async(req, res, next)=> {
  try{
    res.send(await Student.findAll());
  }
  catch(ex){
    next(ex);
  }

})

app.get('/api/schools', async(req, res, next)=> {
  try{
    res.send(await School.findAll());
  }
  catch(ex){
    next(ex);
  }

})

