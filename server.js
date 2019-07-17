const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const { Student, School} = db.models;
app.use(express.json());

db.syncAndSeed();

const port = process.env.PORT || 3000;

app.listen(port, ()=>console.log(`listening on port ${port}`));

app.use('/dist', express.static(path.join(__dirname, 'dist')));

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

app.post('/api/students', async (req, res, next) => {
  try{
    console.log(req.body);
    // if(req.body.schoolId === undefined){
    //   const studentNoSchool = await.create()
    // }
    const student = await Student.create(req.body);
    res.send(student);

  }
  catch(ex){
    next(ex);
  }
})

app.delete('/api/students/:id', async (req, res, next) => {
  try{
    await Student.destroy({where: {id: req.params.id}});
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

app.use((err, req, res, next)=>{
  res.status(500).send(err);
})
