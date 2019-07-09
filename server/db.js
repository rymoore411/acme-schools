const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_schools');

const Student = conn.define('student', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  GPA: Sequelize.DECIMAL

});

const School = conn.define('school', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  name: Sequelize.STRING,
  imageURL: Sequelize.STRING
})

Student.belongsTo(School);
School.hasMany(Student);

const students = [{
  firstName: 'Ryan',
  lastName: 'Moore',
  email: 'ryan_moore@acme.com',
  gpa: 1.9,
},
{
  firstName: 'Jason',
  lastName: 'Scott',
  email: 'jason_scott@acme.com',
  gpa: 2.2,
},
{
  firstName: 'Matthew',
  lastName: 'Simpson',
  email: 'matthew_simpson@acme.com',
  gpa: 4.0,
}
];

const schools = [{
  name: 'Cal Poly',
  imageURL: 'https://www.pngfind.com/pngs/m/267-2679209_cal-poly-mustangs-logo-cal-poly-san-luis.png'
},
{
  name: 'Harvard',
  imageURL: 'https://upload.wikimedia.org/wikipedia/en/8/8e/Harvard_shield-University.png'
},
{
  name: 'M.I.T',
  imageURL: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/44/MIT_Seal.svg/1920px-MIT_Seal.svg.png'
}
];

const syncAndSeed = async() => {
  try{
  await conn.sync({force: true});
  const [calPoly, harvard, mit] = await Promise.all(schools.map(school => School.create({
    name: school.name,
    imageURL: school.imageURL
  })));

  const [ryan, jason, matthew] = await Promise.all(students.map(student => Student.create({
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    GPA: student.gpa
  })));

ryan.schoolId = calPoly.id;
jason.schoolId = harvard.id;
matthew.schoolId = mit.id;
await Promise.all(ryan.save(), jason.save(), matthew.save());
}

catch(err){
  console.log(err);
}

}


module.exports = {
  syncAndSeed,
  models: {
    Student,
    School
  }
}
